# scale_proxy

A module designed to run on both a remote OpenERP server and a client-side OpenERP server, allowing the remote OpenERP server to get readings from a USB scale attached to the client machine.

Provides a `scale_proxy.weigh` client action that takes a `timeout` and a `test_weight` parameter, with `timeout` being the number of seconds the scale should wait for a reading before returning a value and `test_weight` being a spoofed weight the scale server should return to the client for testing purposes.

## Setup

1. Run [scale_proxy_server](http://github.com/ryepdx/scale_proxy_server) on the machine the scale is connected to.
2. Navigate to "Settings > Companies" and select your company from the list of companies.
3. Click the "Edit" button at the top of your company's settings page.
4. Set the url, username, and password for the scale proxy server under "Scale Proxy Settings" on the "Configuration" tab.
5. Set any user-specific proxy settings on each user's respective "Settings" page. (Useful for when there is more than one USB scale per company.)
6. Click the red "Save" button at the top of the page.

For an example of how this module might be used by other modules, take a look at [Quickship](http://github.com/ryepdx/quickship). Quickship uses this module, [printer_proxy](http://github.com/ryepdx/printer_proxy), [shipping_api_fedex](https://github.com/ryepdx/shipping_api_fedex), [shipping_api_ups](https://github.com/ryepdx/shipping_api_ups), and [shipping_api_usps](https://github.com/ryepdx/shipping_api_usps) to provide a shipping kiosk suitable for use in a warehouse environment. Using Quickship, shippers can put a package on a scale, scan the barcode on the sale order's picking sheet, key in a few fields, select a shipping quote from the list that comes back, and have the printer at their station spit out a label.
