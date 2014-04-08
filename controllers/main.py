# -*- coding: utf-8 -*-
import openerp
from ..helpers.usbscale.scale import Scale
from ..helpers.usbscale.scale_manager import ScaleManager
from ..helpers.usbscale.tests import mocks

class ScaleController(openerp.addons.web.http.Controller):
    _cp_path = '/scale_proxy'

    def __init__(self, *args, **kwargs):
        self.scale = Scale()
        self.mock_manager = ScaleManager(
            lookup=mocks.usb_ids.USB_IDS,
            usb_lib=mocks.usb_lib.MockUSBLib()
        )
        self.mock_endpoint = mocks.usb_lib.MockEndpoint(0, 0)
        super(ScaleController, self).__init__(*args, **kwargs)

    @openerp.addons.web.http.jsonrequest
    def weigh(self, request, max_attempts=10, test_weight=None):
        '''Get a reading from the attached USB scale.'''

        # Are we running an integration test...
        if test_weight:
            scale = Scale(device_manager=self.mock_manager)
            scale.device.set_weight(test_weight)
            weighing = scale.weigh(
                endpoint=self.mock_endpoint, max_attempts=float(max_attempts)
            )

        # ...or are we doing an actual weighing?
        if not test_weight:
            weighing = self.scale.weigh(max_attempts=float(max_attempts))

        if weighing:
            return {'success': True, 'weight': weighing.weight, 'unit': weighing.unit}

        return {'success': False, 'error': "Could not read scale"}