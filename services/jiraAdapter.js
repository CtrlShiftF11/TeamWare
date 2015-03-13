var https = require('https');

/**
 * Create an instance of JiraAdapter
 *
 * @param options { jiraApiUrl: 'https://jira.myserver.com' }
 * @constructor
 */
function JiraAdapter(options) {
    console.log("Inside JiraAdapter constructor");
    this.jiraApiUrl = options.jiraApiUrl;
    this.greenhopperPath = '/rest/greenhopper/1.0/rapidview/';
};

/**
 * Fetch the entire Jira Greenhopper RapidView list
 *
 * @param {Function} callback which receives a hash with { body: 'text', statusCode: 200 }
 */
JiraAdapter.prototype.rapidViewList = function(callback) {
    console.log('JiraAdapter.rapidViewList called');
    var requestUrl = this.jiraApiUrl + this.greenhopperPath;
    var body = '';
    var statusCode = '';
    var jiraResponseHandler = function (jiraResponse) {
        console.log('Jira rapidViewList statusCode: ' + jiraResponse.statusCode);
        console.log('Jira rapidViewList headers: ' + JSON.stringify(jiraResponse.headers));
        jiraResponse.setEncoding('utf8');

        statusCode = jiraResponse.statusCode;
        jiraResponse.on('data', function (d) {
            body += d;
        });
        jiraResponse.on('end', function (e) {
            callback({
                statusCode: statusCode,
                body: body
            });
        });
        jiraResponse.on('error', function (e) {
            console.log('Yep sure enough an error has occurred - just your luck - here\'s the info bro\n' + e.message);
        });
    };
    https.get(requestUrl, jiraResponseHandler);
};

module.exports = JiraAdapter;
