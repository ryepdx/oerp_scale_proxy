openerp.scale_proxy = function (instance) {
    instance.scale_proxy = {};
    instance.scale_proxy.Scale  = instance.web.Class.extend({
        init: function(options){
            options = options || {};

            this.req_id = 1;
            this.url = (options.url || 'https://localhost:443/api');
            this.auth = {
                username: "ryan",
                password: "Password1"
            };
            this.notifications = {};
        },

        message: function (method, params) {
            var ret = new $.Deferred();
            var data = {
                id: this.req_id,
                jsonrpc: "2.0",
                method: method,
                params: params
            }

            jQuery.ajax({
              type: "POST",
              url: this.url,
              dataType: 'json',
              async: true,
              headers: {
                "Authorization": "Basic " + btoa(this.auth.username + ":" + this.auth.password)
              },
              crossDomain: true,
              data: JSON.stringify(data),
              success: function (response) {
                  ret.resolve(response.result);
              },
              error: function (response) {
                  ret.reject(response.error);
              }
            });
            this.req_id++;

            return ret;
        },

        // Convenience function for getting a reading from the local scale.
        weigh: function (timeout, test_weight) {
            params = {};
            if (test_weight) {
                params.test_weight = test_weight;
            }
            if (timeout) {
                params.timeout = timeout;
            }
            return this.message("weigh", params);
        }
    });

    // Client actions
    instance.scale_proxy.weigh = function (parent, action) {
        var scale = new instance.scale_proxy.Scale();
        return scale.weigh(action.params.timeout, action.params.test_weight);
    }
    instance.web.client_actions.add('scale_proxy.weigh', "instance.scale_proxy.weigh");
};
