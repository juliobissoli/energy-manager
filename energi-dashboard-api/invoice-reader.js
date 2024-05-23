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
                return line;
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


        /**
         * Obtem informaçes referentes ao consumo de energia
         * como quantidade em kWh, valor da unidade e valor total
         */
        const refEnergyConsumedLine = findLineWithKeyword('Energia ElétricakWh ', text);
        const refEnergyConsumed = refEnergyConsumedLine.trim().split(/\s+/);
        const energyConsumed = {
            consume_amount_in_kwh: refEnergyConsumed[2],
            consume_unit_value: refEnergyConsumed[3],
            consume_total_value: refEnergyConsumed[4],
        }

        /**
        * Obtem informaçes referentes ao taxa de iluminação publica
        */
        const refPublicTaxConsumedLine = findLineWithKeyword('Contrib Ilum Publica Municipal', text);
        const refPublicTaxConsumedTable = refPublicTaxConsumedLine.trim().split(/\s+/);
        const publicTaxConsumed = refPublicTaxConsumedTable[4];


        /**
         * Obtem informaçes referentes ao cliente como
         * nmero do cliente e nmero da instalação
        */
        const tableClientInfo = getTableByHeader('Nº DO CLIENTE', text, 2);
        const clientInfo = tableClientInfo[1].trim().split(/\s+/);

        const client = {
            client_number: clientInfo[0],
            client_instalation: clientInfo[1],
        }

        /**
         * Obtem informaçes referentes a fatura como
         * data de referência, data de vencimento e valor da fatura
        */
        const tableToGenerate = getTableByHeader('Valor a pagar (R$)', text, 2);
        const invoiceInfo = tableToGenerate[1].trim().split(/\s+/);
        const invoice = {
            invoice_date_ref: invoiceInfo[0],
            invoice_due_date: invoiceInfo[1],
            invoice_value: invoiceInfo[2],
        }
        return {
            ...energyConsumed,
            ...client,
            ...invoice,
            public_tax_value: publicTaxConsumed,
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

createInstallation = async (installationNumber, clientNumber) => {
    let installationId = null;
    await api.post('/installations', {
        clientName: `Cliente ${clientNumber}-${installationNumber}`,
        number: installationNumber,
        clientNumber: clientNumber
    }).then(
        res => {
            installationId = res.data.id;
        },
        error => {
            console.log('============= Erro ao criar instalação ============= \n\n', error.response);
        }
    )
    return installationId;
}

handleInsertManyInvoices = async (installationNumber, list) => {
    let installationId = null;
    await api.get(`/installations/number/${installationNumber}`)
    .then(
        res => {
            console.log('============= Instalação obtida com sucesso ============= \n\n', res.data);
            installationId = res.data.id;
        },
        error => {
            console.log('============= Erro ao obter instalação ============= \n\n', error);
            installationId = createInstallation(installationNumber, list[0].client_number);
        }
    )
  
    
    console.log('============= Instalação ID ============= \n\n', installationId);

    const data = list.map(invoice => ({
        installationId: installationId,
        installNumber: installationNumber,
        consumeAmountInKwh: parseFloat(invoice.consume_amount_in_kwh),
        consumeUnitValue: parseFloat(invoice.consume_unit_value),
        consumeTotalValue: parseFloat(invoice.consume_total_value),
        invoiceDateRef: invoice.invoice_date_ref,
        invoiceDueDate: invoice.invoice_due_date,
        invoiceValue: parseFloat(invoice.invoice_value),
        publicTaxValue: parseFloat(invoice.public_tax_value)
    }));

    await api.post('/invoices/create-many', {installationId, invoices: data}).then(
        res => {
            console.log('============= Faturas criadas com sucesso ============= \n\n', res.data);
        },
        error => {
            console.log('============= Erro ao criar faturas ============= \n\n', error.response);
        }
    )
}

const handleSaves = async (data) => {
    console.log('============= Dados obtidos com sucesso =============');

    const installationMap = new Map();

    data.forEach( invoice => {
        if (installationMap.has(invoice.client_instalation)) {
           const list = installationMap.get(invoice.client_instalation);
           list.push(invoice);
           installationMap.set(invoice.client_instalation, list);
        } else {
            installationMap.set(invoice.client_instalation, [invoice]);
        }
    })


    installationMap.forEach(async (invoices, installationId) => {
        console.log(`Instalação ID: ${installationId}, Faturas: ${invoices.length}`);
        
        handleInsertManyInvoices(installationId, invoices);

    });
    return 
    for (let invoice of data) {
        let installationId;
        if (!installationMap.get(invoice.client_instalation)) {
            const url = `http://localhost:3000/installations/number/${invoice.client_instalation}`;
            console.log('============= URL ============= \n\n', url);
            const currentInstallation = await api.get(`/installations/number/${invoice.client_instalation}`).then(
                res => {
                    console.log('============= Instalação obtida com sucesso ============= \n\n', res.data);
                },
                error => {
                    console.log('============= Erro ao obter instalação ============= \n\n', error);
                }
            )
            // if (currentInstallation.data) {
            //     installationId = currentInstallation.data.id;
            //     installationMap.set(invoice.client_instalation, installationId);
            // } else {
            //     const newInstallation = await api.post('/installations', {
            //         clientName: "Teste",
            //         number: invoice.client_instalation,
            //         clientNumber: invoice.client_number

            //     });

            //     if (newInstallation.data) {
            //         installationId = newInstallation.data.id;
            //         installationMap.set(invoice.client_instalation, installationId);
            //     }
            // } 
            
        }

        // const newInvoice = await api.post(`/invoices`, {
        //     installationId: installationId,
        //     installNumber: invoice.client_instalation,
        //     consumeAmountInKwh: invoice.consume_amount_in_kwh,
        //     consumeUnitValue: invoice.consume_unit_value,
        //     consumeTotalValue: invoice.consume_total_value,
        //     invoiceDateRef: invoice.invoice_date_ref,
        //     invoiceDueDate: invoice.invoice_due_date,
        //     invoiceValue: invoice.invoice_value,
        //     publicTaxValue: invoice.public_tax_value
        // });

        // if (newInvoice.data) {
        //     console.log('============= Fatura criada com sucesso =============', newInvoice.data);
        // }
    }

    // data.forEach(async invoice => {
    //     let installationId;
    //     if (!installationMap.get(invoice.client_instalation)) {

    //         const currentInstallation = await api.get(`/installations/${invoice.client_instalation}`);

    //         if (currentInstallation.data) {
    //             installationId = currentInstallation.data.id;
    //             installationMap.set(invoice.client_instalation, installationId);
    //         } else {
    //             const newInstallation = await api.post('/installations', {
    //                 clientName: "Teste",
    //                 number: invoice.client_instalation,
    //                 clientNumber: invoice.client_number

    //             });

    //             if (newInstallation.data) {
    //                 installationId = newInstallation.data.id;
    //                 installationMap.set(invoice.client_instalation, installationId);
    //             }
    //         } 
            
    //     }

    //     const newInvoice = await api.post(`/invoices`, {
    //         installationId: installationId,
    //         installNumber: invoice.client_instalation,
    //         consumeAmountInKwh: invoice.consume_amount_in_kwh,
    //         consumeUnitValue: invoice.consume_unit_value,
    //         consumeTotalValue: invoice.consume_total_value,
    //         invoiceDateRef: invoice.invoice_date_ref,
    //         invoiceDueDate: invoice.invoice_due_date,
    //         invoiceValue: invoice.invoice_value,
    //         publicTaxValue: invoice.public_tax_value
    //     });

    //     if (newInvoice.data) {
    //         console.log('============= Fatura criada com sucesso =============', newInvoice.data);
    //     }

    // });

    console.log(installationMap);
}



async function main() {

    try {
        const files = await listFilesInDirectory('./invoices');

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

