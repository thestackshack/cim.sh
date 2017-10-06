//
// Add JavaScript
//
$(function() {
    var data = [
        {
            action: 'type',
            strings: ["npm install -g cim^400"],
            output: '<br><span class="gray">+cim@0.10.2 installed</span><br><br>',
            postDelay: 1000
        },
        {
            action: 'type',
            strings: ["mkdir app && cd app^400"],
            output: '<br>',
            postDelay: 1000
        },
        {
            action: 'type',
            strings: ["cim create --template=serverless-web-app^400"],
            output: $('.cim-create-output').html(),
            postDelay: 1000
        },
        {
            action: 'type',
            strings: ["cim stack-up^400"],
            output: '<br>',
            postDelay: 60,
            hideNextPrefix: true,
        },
        {
            action: 'type',
            strings: [".....^400"],
            output: '<br><span class="gray">Stack has been created!</span><br><br>',
            typeSpeed: 500,
            hidePrefix: true,
            prefix: '<span></span>'
        },
        {
            action: 'type',
            strings: ["that was easy!", ''],
            postDelay: 2000
        }

    ];
    runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
        $('.history').html('');
    }
    switch(script.action) {
        case 'type':
            // cleanup for next execution
            prompt.removeData();
            $('.typed-cursor').text('');
            if (script.hidePrefix)
                $(".terminal .prompt-prefix").hide();
            prompt.typed({
                strings: script.strings,
                typeSpeed: script.typeSpeed || 30,
                callback: function() {
                    var history = $('.history').html();
                    history = history ? [history] : [];
                    var prefix = script.prefix || '$ ';
                    history.push(prefix + prompt.text());
                    if(script.output) {
                        history.push(script.output);
                        prompt.html('');
                        $('.history').html(history.join(''));
                    }
                    // scroll to bottom of screen
                    $('section.terminal').scrollTop($('section.terminal').height());
                    if (script.hideNextPrefix)
                        $(".terminal .prompt-prefix").hide();
                    else
                        $(".terminal .prompt-prefix").show();
                    // Run next script
                    pos++;
                    if(pos < data.length) {
                        setTimeout(function() {
                            runScripts(data, pos);
                        }, script.postDelay || 1000);
                    }
                }
            });
            break;
        case 'dots':
            break;
    }
}
