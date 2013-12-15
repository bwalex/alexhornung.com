(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
            'jquery',
            'modules/comments-api',
            'jade!templates/comments-form.jade',
            'jade!templates/comments-list.jade',
	    'vendor/jquery.timeago',
            'recaptcha'
            ], factory);
    } else {
        // Browser globals
        // Who are we kidding? This doesn't really work
        factory(jQuery);
    }
}(function ($, CommentsAPI, tmplForm, tmplList) {
    $.fn.comments = function (options) {
        var $this = $(this);

        var api = new CommentsAPI({
            url                : options.url,
            domain             : options.domain,
            article_name       : options.article.name,
            article_url        : options.article.url,
            article_identifier : options.article.identifier
        });

        var $commentList = $(document.createElement("div")).attr('id', 'comment-contents').appendTo($this);
        var $commentForm = $(tmplForm(options)).appendTo($this);
        api.isOpen(function (open) {
            if (!open) {
                $(document.createElement("div")).addClass("alert-box warning radius")
                    .html("Comments are closed.")
                    .insertAfter($commentForm);
                $commentForm.hide();
            }
        });

        var refreshComments = function() {
            api.get({
                successFn: function(resp) {
                    $commentList.html(tmplList({comments: resp}));
                    $commentList.find("time.timeago").timeago();
                },
                errorFn: function(resp, status) {
                    $commentList.html('<div class="alert-box alert radius">Error loading comments: ' + resp.error || "Unknown error" + '</div>');
                }
            });
        };

        Recaptcha.create(options.recaptcha.public_key, "captcha", {
            theme: options.recaptcha.theme
        });

        $commentForm.find("#comment-submit").click(function() {
            $commentForm.find("#comment-submit").attr("disabled", "disabled").addClass("disabled");
            $commentForm.find("input.error,textarea.error").removeClass("error");
            $commentForm.find("small.error,.alert-box").remove();

            api.post({
                captcha_challenge  : Recaptcha.get_challenge(),
                captcha_response   : Recaptcha.get_response(),
                email              : $commentForm.find("#comment-email").val(),
                name               : $commentForm.find("#comment-name").val(),
                comment            : $commentForm.find("#comment-comment").val(),
                successFn: function(resp) {
                    $(document.createElement("div")).addClass("alert-box success radius")
                        .html("Your comment has been posted successfully.")
                        .insertAfter("#comment-submit");
                    $commentForm.find("input[type=text]").val("");
                    $commentForm.find("textarea").val("");
                    refreshComments();
                },
                errorFn: function(resp, status) {
                    if (resp.error == "captcha") {
                        $commentForm.find("#captcha").find("input[type=text]").addClass("error");
                        $(document.createElement("small")).addClass("error")
                            .html("Incorrect captcha text. Please try again.")
                            .insertAfter("#captcha input[type=text]");
                    } else if (resp.error == "comment") {
                        $.each(resp.error_code, function(key, val) {
                        $commentForm.find("#comment-"+key).addClass("error");
                        $(document.createElement("small")).addClass("error")
                            .html(""+val[0])
                            .insertAfter("#comment-"+key);
                        });
                    } else if (resp.error == "closed") {
                        $(document.createElement("div")).addClass("alert-box alert radius")
                            .html("Comments are closed.")
                            .insertAfter("#comment-submit");
                    } else {
                        $(document.createElement("div")).addClass("alert-box alert radius")
                            .html("Unknown error: " + status)
                            .insertAfter("#comment-submit");
                    }
                },
                doneFn: function() {
                    $commentForm.find("#comment-submit").removeAttr("disabled").removeClass("disabled");
                    Recaptcha.reload();
                }
            });

        });

        refreshComments();
    }
}));
