import Realm from 'realm'

export const schemaTypes = {
    history: 'History'
}

class History {}

History.schema = {
    name: 'History',
    properties: {
        title: 'string',
        options: { type: 'list', objectType: 'string' },
        icon: 'string'
    }
};

const realm = new Realm({ schema: [ History ] });

export default realm;