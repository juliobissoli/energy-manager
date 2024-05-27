export const createInstallationDocs = {
    schema: {
        description: 'Create installation',
        tags: ['installation'],
        params: {
            type: 'object',
            properties: {
                number: { type: 'string'},
                clientName: { type: 'string' },
                clientNumber: { type: 'string' }
            },
            required: ['number']
        }
    }
};

export const findByIdDocs = {
    schema: {
        description: 'Find installation by ID',
        tags: ['installation'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        }
    }
};

export const findByNumberDocs = {
    schema: {
        description: 'Find installation by number',
        tags: ['installation'],
        params: {
            type: 'object',
            properties: {
                number: { type: 'string' }
            },
            required: ['number']
        }
    }
};

export const findAllDocs = {
    schema: {
        description: 'Find all installations',
        tags: ['installation'],
        params: {}
    }
};