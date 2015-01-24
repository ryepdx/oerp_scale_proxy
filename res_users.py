# -*- coding: utf-8 -*-
from openerp.osv import fields,osv

class res_users(osv.osv):
    _inherit = "res.users"
    _columns = {
        'scale_proxy_url': fields.char('URL', size=255),
        'scale_proxy_username': fields.char('Username', size=255),
        'scale_proxy_password': fields.char('Password', size=255)
    }

    def get_scale_proxy_settings(self, cr, uid, *args, **kwargs):
        user = self.browse(cr, uid, uid)

        return {
            'url': user.scale_proxy_url or user.company_id.scale_proxy_url,
            'username': user.scale_proxy_username or user.company_id.scale_proxy_username,
            'password': user.scale_proxy_password or user.company_id.scale_proxy_password
        }

res_users()