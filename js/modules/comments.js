(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    return function(opts) {
        this.opts = opts;
        this.postComment = function(parameters) {
            $.ajax({
                type: "POST",
                url: this.opts.url,
                headers: {
                    "Accept" : "application/vnd.comments-v1+json"
                },
                contentType: "application/json",
                processData: false,
                dataType: "json",
                data: JSON.stringify({
                    "captcha_challenge"  : Recaptcha.get_challenge(),
                    "captcha_response"   : Recaptcha.get_response(),
                    "site_domain"        : this.opts.domain,
                    "article_name"       : paramters.article_name,
                    "article_identifier" : parameters.article_identifier,
                    "email"              : parameters.email,
                    "name"               : parameters.name,
                    "comment"            : parameters.comment
                })
            }).done(function(data, textStatus, jqXHR) {
                if (typeof(parameters.successFn) === 'function')
                    parameters.successFn(data);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                var resp = jqXHR.responseJSON || { error: "unknown" };
                if (typeof(parameters.errorFn) === 'function')
                    parameters.errorFn(resp, jqXHR.status);
            });
        };
    };
}));
