export const travaySlackBotMixin = {
  methods: {
    //   async newUserNotification(user, context, callback) {
    //     if (context.stats.loginsCount > 1) return callback(null, user, context);
    //     const SLACK_HOOK = 'TRAVAY_SLACK_HOOK';
    //     const slack = require('slack-notify')(SLACK_HOOK);
    //     const message =
    //       'You have a new User: ' +
    //       (user.name || user.email) +
    //       ' (' +
    //       user.email +
    //       ')';
    //     const channel = '#travay';
    //     slack.success({
    //       text: message,
    //       channel: channel,
    //       color: 'good'
    //     });
    //     // don’t wait for the Slack API call to finish, return right away (the request will continue on the sandbox)
    //     callback(null, user, context);
    //   }
  }
};
