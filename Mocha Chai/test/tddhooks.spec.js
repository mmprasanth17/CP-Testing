const {suite,test,setup,teardown,suiteSetup,suiteTeardown} = require('mocha')
    
suite('TDD hooks', ()=>{
    suiteSetup(()=>{
        console.log('one suitesetup')
    });

    suiteTeardown(()=>{
        console.log('one suitesetup')
    });

    setup(()=>{
        console.log('one setup')
    });

    teardown(()=>{
        console.log('one teardown')
    });

    // test cases

    test('add(7,7) should return 10',()=>{
        console.log('one test')
    });
})