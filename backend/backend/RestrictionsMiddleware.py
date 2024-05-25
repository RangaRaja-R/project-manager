from typing import Any
from django.http import HttpResponseForbidden

ALLOWED_IPS = [
    '127.0.0.1',
]

ALLOWED_DOMAINS = [
    'localhost',
    'rangaraja-r.github.io'
]

class RestrictionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        ip = request.META.get('REMOTE_ADDR')
        domain = request.get_host().split(':')[0]
        if ip not in ALLOWED_IPS and domain not in ALLOWED_DOMAINS:
            return HttpResponseForbidden(f'Forbidden: Access denied from {domain}({ip})')
        return self.get_response(request)