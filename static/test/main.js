openerp.testing.section('weighing sanity check', function (test){
    test('make sure weigh doesn\'t fail', {rpc: 'rpc', asserts: 3}, function (instance) {
        var ret = new $.Deferred();
        var connection = new instance.web.JsonRPC();
        connection.setup('http://localhost:8069');

        connection.rpc('/scale_proxy/weigh', {"test_weight": "5.10 lb"}).done(function(result) {
            ok(result.success, "server returned without error");
            ok(result.unit == "pound");
            ok(result.weight == 5.1);
            ret.resolve(result);
        }).fail(function(error) {
            console.log(error);
            ok(false, "server threw error");
            ret.reject(error);
        });
        return ret;
    });
})
