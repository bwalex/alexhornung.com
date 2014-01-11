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

        this.post = function(parameters) {
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
                    "captcha_challenge"  : parameters.captcha_challenge,
                    "captcha_response"   : parameters.captcha_response,
                    "site_domain"        : this.opts.domain,
                    "article_name"       : this.opts.article_name,
                    "article_url"        : this.opts.article_url,
                    "article_identifier" : this.opts.article_identifier,
                    "email"              : parameters.email,
                    "name"               : parameters.name,
                    "comment"            : parameters.comment
                })
            }).done(function(data, textStatus, jqXHR) {
                if (typeof(parameters.successFn) === 'function')
                    parameters.successFn(data);
                if (typeof(parameters.doneFn) === 'function')
                    parameters.doneFn();
            }).fail(function(jqXHR, textStatus, errorThrown) {
                var resp = jqXHR.responseJSON || { error: "unknown" };
                if (typeof(parameters.errorFn) === 'function')
                    parameters.errorFn(resp, jqXHR.status);
                if (typeof(parameters.doneFn) === 'function')
                    parameters.doneFn();
            });
        };

        this.get = function(parameters) {
            $.ajax({
                type: "GET",
                url: this.opts.url,
                headers: {
                    "Accept" : "application/vnd.comments-v1+json"
                },
                contentType: "application/json",
                //processData: false,
                dataType: "json",
                data: {
                    "site_domain"        : this.opts.domain,
                    "article_identifier" : this.opts.article_identifier
                }
            }).done(function(data, textStatus, jqXHR) {
                if (typeof(parameters.successFn) === 'function')
                    parameters.successFn(data);
                if (typeof(parameters.doneFn) === 'function')
                    parameters.doneFn();
            }).fail(function(jqXHR, textStatus, errorThrown) {
                var resp = jqXHR.responseJSON || { error: "unknown" };
                if (typeof(parameters.errorFn) === 'function')
                    parameters.errorFn(resp, jqXHR.status);
                if (typeof(parameters.doneFn) === 'function')
                    parameters.doneFn();
            });
        };

        this.isOpen = function(callbackFn) {
            $.ajax({
                type: "GET",
                url: this.opts.url + "/open",
                headers: {
                    "Accept" : "application/vnd.comments-v1+json"
                },
                contentType: "application/json",
                //processData: false,
                dataType: "json",
                data: {
                    "site_domain"        : this.opts.domain,
                    "article_identifier" : this.opts.article_identifier
                }
            }).done(function(data, textStatus, jqXHR) {
                if (typeof(callbackFn) === 'function')
                    callbackFn(data.can_comment);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                if (typeof(callbackFn) === 'function')
                    callbackFn(false);
            });
        }
    };
}));
