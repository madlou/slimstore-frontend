const apiDefault = {
    'view': {
        'name': 'ERROR',
        'title': '',
        'message': '',
        'form': {
            'targetView': 'HOME',
            'serverProcess': null,
            'elements': [],
        },
        'functionButtons': [],
    },
    'user': {
        'id': 0,
        'code': '',
        'email': '',
        'name': ''
    },
    'error': 'Connection issues with server... automatically retrying to reconnect.',
    'report': null,
}

export default apiDefault;