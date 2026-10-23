// Lighthouse CI: audits the built site and fails the run if performance,
// accessibility, best practices or SEO drop below the budgets below.
const pages = ['/', '/about_vedran', '/vedrans_design_work', '/side_project--walnut'];

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node tests/serve.mjs dist 4322',
      startServerReadyPattern: 'Serving',
      url: pages.map((p) => `http://127.0.0.1:4322${p}`),
      numberOfRuns: 1,
      settings: {
        // Third-party scripts (analytics) are outside the site's control.
        blockedUrlPatterns: ['*google-analytics.com*'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
