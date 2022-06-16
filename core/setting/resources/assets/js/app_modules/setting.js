class SettingManagement {
    init() {
        $('input[data-key=email-config-status-btn]').on('change', (event) => {
            let _self = $(event.currentTarget);
            let key = _self.prop('id');
            let url = _self.data('change-url');

            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    key: key,
                    value: _self.prop('checked') ? 1 : 0
                },
                success: (res) => {
                    if (!res.error) {
                        Botble.showNotice('success', res.message);
                    } else {
                        Botble.showNotice('error', res.message);
                    }
                },
                error: (res) => {
                    Botble.handleError(res);
                }
            });
        });

        $(document).on('change', '#email_driver', (event) => {
            if ($(event.currentTarget).val() === 'mailgun') {
                $('.setting-mail-password').addClass('hidden');
                $('.setting-mail-mail-gun').removeClass('hidden');
            } else {
                $('.setting-mail-password').removeClass('hidden');
                $('.setting-mail-mail-gun').addClass('hidden');
            }
        });

        $('#send-test-email-btn').on('click', (event) => {
            event.preventDefault();
            let _self = $(event.currentTarget);

            _self.addClass('button-loading');

            $.ajax({
                type: 'POST',
                url: route('setting.email.send.test'),
                data: {
                    email: _self.closest('.modal-content').find('input[name=email]').val()
                },
                success: (res) => {
                    if (!res.error) {
                        Botble.showNotice('success', res.message);
                    } else {
                        Botble.showNotice('error', res.message);
                    }
                    _self.removeClass('button-loading');
                    _self.closest('.modal').modal('hide');
                },
                error: (res) => {
                    Botble.handleError(res);
                    _self.removeClass('button-loading');
                    _self.closest('.modal').modal('hide');
                }
            });
        });

        if (typeof CodeMirror !== 'undefined') {
            Botble.initCodeEditor('mail-template-editor');
        }

        $(document).on('click', '.btn-trigger-reset-to-default', (event) => {
            event.preventDefault();
            $('#reset-template-to-default-button').data('target', $(event.currentTarget).data('target'));
            $('#reset-template-to-default-modal').modal('show');
        });

        $(document).on('click', '#reset-template-to-default-button', (event) => {
            event.preventDefault();
            let _self = $(event.currentTarget);

            _self.addClass('button-loading');

            $.ajax({
                type: 'POST',
                cache: false,
                url: _self.data('target'),
                data: {
                    email_subject_key: $('input[name=email_subject_key]').val(),
                    template_path: $('input[name=template_path]').val(),
                },
                success: (res) => {
                    if (!res.error) {
                        Botble.showNotice('success', res.message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        Botble.showNotice('error', res.message);
                    }
                    _self.removeClass('button-loading');
                    $('#reset-template-to-default-modal').modal('hide');
                },
                error: (res) => {
                    Botble.handleError(res);
                    _self.removeClass('button-loading');
                }
            });
        });
    }
}

$(document).ready(() => {
    new SettingManagement().init();
});