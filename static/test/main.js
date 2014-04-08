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

    test('make sure weigh\'s long polling doesn\'t fail', {rpc: 'rpc', asserts: 3}, function (instance) {
        var ret = new $.Deferred();
        var connection = new instance.web.JsonRPC();
        connection.setup('http://localhost:8069');

        connection.rpc('/scale_proxy/weigh',
            // `timeout` is the number of seconds the server should wait for a change in the
            // scale's reading before returning. "inf" tells the server to wait forever for
            // a change in the scale's reading.
            {"test_weight": "1.94 kg", "timeout": "inf"}
        ).done(function(result) {
            ok(result.success, "server returned without error");
            ok(result.unit == "kilogram");
            ok(result.weight == 1.94);
            ret.resolve(result);
        }).fail(function(error) {
            console.log(error);
            ok(false, "server threw error");
            ret.reject(error);
        });
        return ret;
    });
})
