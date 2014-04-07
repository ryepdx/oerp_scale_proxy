openerp.scale_proxy = function (instance) {
    instance.scale_proxy = {};
    instance.scale_proxy.Scale  = instance.web.Class.extend({
        init: function(options){
            options = options || {};

            this.connection = new instance.web.JsonRPC();
            this.connection.setup(options.url || 'http://localhost:8069');
            this.notifications = {};
        },

        // Makes a JSON-RPC call to the local OpenERP server.
        message : function(name,params){
            var ret = new $.Deferred();
            var callbacks = this.notifications[name] || [];
            for(var i = 0; i < callbacks.length; i++){
                callbacks[i](params);
            }

            this.connection.rpc('/scale_proxy/' + name, params || {}).done(function(result) {
                ret.resolve(result);
            }).fail(function(error) {
                ret.reject(error);
            });
            return ret;
        },

        // Allows triggers to be set for when particular JSON-RPC function calls are made via 'message.'
        add_notification: function(name, callback){
            if(!this.notifications[name]){
                this.notifications[name] = [];
            }
            this.notifications[name].push(callback);
        },

        // Convenience function for getting a reading from the local scale.
        weigh: function (test_weight) {
            params = {};
            if (test_weight) {
                params.test_weight = test_weight;
            }
            return this.message("weigh", params);
        }
    });

    // Client actions
    instance.scale_proxy.weigh = function (parent, action) {
        var scale = new instance.scale_proxy.Scale();
        return scale.weigh(action.params.test_weight);
    }
    instance.web.client_actions.add('scale_proxy.weigh', "instance.scale_proxy.weigh");
};
