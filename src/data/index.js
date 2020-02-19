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

realm.write(() => {
    realm.create(History, {
        title: '점심메뉴',
        options: ['하누비노', '메콩타이', '홍이네 닭볶음탕', '미가라부진', '서가앤쿡'],
        icon: 'food'
    })
});

realm.write(() => {
    realm.create(History, {
        title: '몰아주기',
        options: ['이상은', '남혜은', '이관호', '김재환', '박경철'],
        icon: 'money'
    })
});

realm.write(() => {
    realm.create(History, {
        title: '보드게임 순서',
        options: ['이상은', '남혜은', '이관호', '김재환', '박경철', '김보민'],
        icon: 'smile'
    })
});

realm.write(() => {
    realm.create(History, {
        title: '우리 다니는 회사',
        options: ['재환컴퍼니', '라인', '카카오', '삼성', '우아한형제들'],
        icon: 'path'
    })
});

export default realm;