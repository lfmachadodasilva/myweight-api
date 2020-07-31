// eslint-disable-next-line no-unused-vars
import { User } from './models/user';

describe('Just test', () => {
    test('it should be ok', () => {
        const user = { name: 'My Name' } as User;
        expect(user.name).toEqual('My Name');
    });
});
