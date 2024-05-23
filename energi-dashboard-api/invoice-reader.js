const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

const readPdf = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);


    // Função para buscar uma linha específica com base em uma palavra-chave
    const findLineWithKeyword = (keyword, text) => {
        const lines = text.split('\n');
        for (let line of lines) {
            if (line.includes(keyword)) {
                return line.trim()?.split(/\s+/) || [];;
            }
        }
        return null;
    };

    const getTableByHeader = (header, text, rowSize) => {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes(header)) {
                const table = lines.slice(i, i + rowSize);
                return table;
            }
        }
        return null;
    };

    const extractInfo = (text) => {

        // console.log('============= Texto ===> ', text);
        /**
         * Obtem informaçes referentes ao consumo de energia
         * como quantidade em kWh, valor da unidade e valor total
         */
        const refEnergyConsumed = findLineWithKeyword('Energia ElétricakWh ', text);
        // const refEnergyConsumed = refEnergyConsumedLine.trim().split(/\s+/);
        const energyConsumed = {
            consumeAmountInKwh: parseFloat(refEnergyConsumed[2]),
            consumeUnitValue: parseFloat(refEnergyConsumed[3]),
            consumeTotalValue: parseFloat(refEnergyConsumed[4]),
        }
        const energyConsumedTotal = parseFloat(refEnergyConsumed[2]);

        /**
     * Obtem informaçes referentes ao consumo de energia
     * como refEnergyConsSCEE em kWh, valor da unidade e valor total
     */
        const refEnergySCEE = findLineWithKeyword('Energia SCEE ISENTAkWh ', text);
        // const refEnergySCEE = refEnergyConsSCEE?.trim()?.split(/\s+/) || [];
        const energySCEE = refEnergySCEE ? parseFloat(refEnergySCEE[3]) : 0;

        const fullConsumedEnergy = energySCEE + energyConsumedTotal;



        const compensatedEnergyRef = findLineWithKeyword('Energia compensada GD IkWh ', text);
        const compensatedEnergy = compensatedEnergyRef ? parseFloat(compensatedEnergyRef[4]) : 0;
        const economyGD = compensatedEnergyRef ? parseFloat(compensatedEnergyRef[6]) : 0;
        const valueWithoutGD = energyConsumedTotal - economyGD;
        const energyCompensated = valueWithoutGD;
        /**
        * Obtem informaçes referentes ao taxa de iluminação publica
        */
        const refPublicTaxConsumedTable = findLineWithKeyword('Contrib Ilum Publica Municipal', text);
        // const refPublicTaxConsumedTable = refPublicTaxConsumedLine.trim().split(/\s+/);
        const publicTaxConsumed = refPublicTaxConsumedTable ? parseFloat(refPublicTaxConsumedTable[4]) : 0;


        /**
         * Obtem informaçes referentes ao cliente como
         * nmero do cliente e nmero da instalação
        */
        const tableClientInfo = getTableByHeader('Nº DO CLIENTE', text, 2);
        const clientInfo = tableClientInfo ? tableClientInfo[1].trim().split(/\s+/) : [];

        const client = {
            clientNumber: clientInfo[0],
            installNumber: clientInfo[1],
        }

        /**
         * Obtem informaçes referentes a fatura como
         * data de referência, data de vencimento e valor da fatura
        */
        const tableToGenerate = getTableByHeader('Valor a pagar (R$)', text, 2);
        const invoiceInfo = tableToGenerate[1].trim().split(/\s+/);
        const invoice = {
            invoiceDateRef: invoiceInfo[0],
            invoiceDueDate: invoiceInfo[1],
            invoiceValue: parseFloat(invoiceInfo[2]),
        }



        // Obtem nome do cliente
        let tableToClientName = getTableByHeader('Comprovante de Pagamento', text, 2);
        let clientName = 'Client';

        if (tableToClientName) {
            clientName = tableToClientName[1];
        } else {
            tableToClientName = getTableByHeader('AUTOMÁTICO', text, 2);
            if (tableToClientName) {
                clientName = tableToClientName[1];
            }
        }



        return {
            ...energyConsumed,
            ...client,
            ...invoice,
            publicTaxValue: publicTaxConsumed,
            economyGD,
            energyCompensated,
            fullConsumedEnergy,
            compensatedEnergy,
            valueWithoutGD,
            clientName
        };
    };

    const info = extractInfo(data.text);

    return info;
};

// Caminho do arquivo PDF


/**
 * Lista todos os arquivos no diretório especificado
 * @param {string} directoryPath - Caminho do diretório a ser listado
 * @returns {Promise<string[]>} - Promessa que resolve com a lista de arquivos
*/
function listFilesInDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject('Erro ao listar os arquivos do diretório: ' + err);
            } else {
                resolve(files);
            }
        });
    });
}

// // Exemplo de uso da função listFilesInDirectory
// listFilesInDirectory('./invoices').then(files => {
//     console.log('Arquivos no diretório /invoices:', files);
// }).catch(err => {
//     console.error(err);
// });

createInstallation = async (installationNumber, clientNumber, clientName) => {
    return await api.post('/installations', {
        clientName,
        clientNumber,
        number: installationNumber,
    }).then(
        res => {
            console.log('============= Instalação criada com sucesso ============= \n\n', res.data);
            return res.data;
        },
        error => {
            console.log('============= Erro ao criar instalação ============= \n\n', error);
            throw error;
        }
    )

}

handleInsertManyInvoices = async (installationNumber, list) => {
    let installationId = null;
    await api.get(`/installations/number/${installationNumber}`)
        .then(
            res => installationId = res.data.id,
        )
    if (!installationId) {
        await createInstallation(installationNumber, list[0].clientNumber, list[0].clientName).then(
            res => installationId = res.data.id
        )
    }

    console.log('============= Instalação ID ============= \n\n', installationId);

    const data = list

    if (installationId) {
        await api.post('/invoices/create-many', { installationId, invoices: data }).then(
            res => {
                console.log('============= Faturas criadas com sucesso ============= \n\n', res.data);
            },
            error => {
                console.log('============= Erro ao criar faturas ============= \n\n', error.response);
            }
        )
    }
    else {
        console.log('============= Instalação não encontrada ============= \n\n');
    }
}

const handleSaves = async (data) => {
    console.log('============= Dados obtidos com sucesso =============');

    const installationMap = new Map();
    data.forEach(invoice => {
        if (installationMap.has(invoice.installNumber)) {
            const list = installationMap.get(invoice.installNumber);
            list.push(invoice);
            installationMap.set(invoice.installNumber, list);
        } else {
            installationMap.set(invoice.installNumber, [invoice]);
        }
    })


    installationMap.forEach(async (invoices, installationId) => {
        console.log(`Instalação ID: ${installationId}, Faturas: ${invoices.length}`);

        handleInsertManyInvoices(installationId, invoices);

    });
    return
}



async function main() {

    try {
        const files = await listFilesInDirectory('./invoices');
        // const files = ['3000055479-11-2023.pdf']
        console.log(files);

        Promise.all(files.map(file => readPdf(`./invoices/${file}`))).then(
            res => {
                console.log('============= Dados obtidos com sucesso =============')
                console.log(res);
                handleSaves(res);
            }, error => {
                // Trata os arauivos que deram algum erro na leitura
                console.log('============= Algum erro ocorreu na leitura =============')
                console.error(error);
            }
        )


    } catch (error) {
        console.error('============= Algum erro ocorreu na leitura ============= \n\n', error);
    }

}


main();

