// const expect = required('chai').expect
const axios = require('axios')

let expect;
    (async ()=>{
        const chai = await import('chai');
        expect = chai.expect;
    })();
    
describe('Test suite 1',function(){
    this.retries(1);
    it('promised based way',function (){
        this.retries(3);

        return axios.get('https://reqres.in/api/users?page=2').then(res =>{
            expect(res.data.data[1].email).to.be.equal('lindsay.ferguson@reqres.in');
            
        })

        .catch(err =>{
            console.error('Error during test:', err);
            throw err;
        });
  


    });
});