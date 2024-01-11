import { DoSomething } from '../../../src/do-something'
describe('DoSomething', () => {
    describe('do', () => {
        ['run', 'jump', 'eat', 'code'].forEach(action => {
            it(`should do ${action}`, () => {
                expect(DoSomething.do(action)).toEqual(`OK... ${action}ing`)
            })
        })
    })
})
