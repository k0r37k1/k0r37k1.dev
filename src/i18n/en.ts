export default {
	// Navigation & Header
	header: {
		title: 'visitor@k0r37k1.dev:~$ cat portfolio.txt',
	},

	// Hero Section
	hero: {
		greeting: "Hi, I'm",
		name: 'k0r37k1',
		welcome: 'Welcome to my Portfolio where ideas become reality',
		subtitle: 'Vibe Engineer • AI Enthusiast • Problem Solver',
		tagline: 'Vibe Engineer & Digital Craftsman',
		description:
			'I build modern web applications with a focus on performance, accessibility, and clean code.',
		cta: {
			projects: 'View Projects',
			contact: 'Get in Touch',
		},
	},

	// Section Titles
	sections: {
		profile: '▀▄▀▄ PROFILE ▄▀▄▀',
		projects: '▀▄▀▄ PROJECTS ▄▀▄▀',
		skills: '▀▄▀▄ ENVIRONMENT ▄▀▄▀',
		contact: '▀▄▀▄ CONTACT ▄▀▄▀',
		blog: '▀▄▀▄ BLOG ▄▀▄▀',
	},

	// About Section
	about: {
		who: {
			label: '[ WHO ]',
			text: "Alex. I build digital stuff – web, apps, whatever's interesting. Vibe Engineer, because full-stack sounds too boring.",
		},
		what: {
			label: '[ WHAT ]',
			text: "Vue, React, Flutter. AI makes the code faster, I focus on accessibility and performance. Frontend is my thing, but I'm versatile.",
		},
		now: {
			label: '[ NOW ]',
			text: 'Contributing to open source, playing with new web tech, optimizing AI workflows. Always experimenting.',
		},
	},

	// Blog Section
	blog: {
		title: 'Blog',
		description: 'Personal dev blog',
		readMore: 'Read more →',
		publishedOn: 'Published on',
		updatedOn: 'Updated on',
		tags: 'Tags',
		allPosts: 'All Posts',
		noPosts: 'No posts yet.',
		backToBlog: '← back to blog',
	},

	// Projects Section
	projects: {
		viewProject: 'View Project',
		sourceCode: 'Source Code',
		technologies: 'Technologies',
		stack: 'Stack:',
		github: 'GitHub',
		liveDemo: 'Demo',
		store: 'Store',
		items: [
			{
				title: 'Project Alpha',
				description: 'A revolutionary web application built with modern technologies.',
				stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
				github: 'https://github.com/yourusername/project-alpha',
				demo: 'https://project-alpha.demo',
			},
			{
				title: 'Project Beta',
				description: 'An innovative solution for real-world problems.',
				stack: ['Astro', 'React', 'Node.js'],
				github: 'https://github.com/yourusername/project-beta',
				demo: null,
			},
			{
				title: 'Project Gamma',
				description: 'A beautiful UI component library for developers.',
				stack: ['Vue 3', 'Vite', 'Storybook'],
				github: 'https://github.com/yourusername/project-gamma',
				demo: 'https://project-gamma.demo',
			},
			{
				title: 'Project Delta',
				description: 'Full-stack application with real-time features.',
				stack: ['TypeScript', 'WebSocket', 'PostgreSQL'],
				github: 'https://github.com/yourusername/project-delta',
				demo: 'https://project-delta.demo',
			},
		],
	},

	// Skills Section
	skills: {
		categories: {
			languages: 'programming languages',
			frameworks: 'frameworks & libraries',
			tools: 'tools & technologies',
			platforms: 'platforms',
			concepts: 'other skills',
		},
		items: {
			desktop: 'Desktop',
			mobile: 'Mobile',
			testing: 'Testing',
			accessibility: 'Accessibility',
			restfulApi: 'RESTful API',
		},
	},

	// Contact Section
	contact: {
		title: 'Get in Touch',
		description:
			"Got an idea? Let's talk. Or just say hi on social media. Like what I do? Donations are welcome.",
		email: 'Email',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		form: {
			name: 'Name',
			email: 'Email',
			message: 'Message',
			submit: 'Send Message',
			sending: 'Sending...',
			success: 'Message sent successfully!',
			error: 'Error sending message. Please try again.',
		},
	},

	// Footer
	footer: {
		copyright: '© {year} k0r37k1.dev',
		madeWith: 'Built with',
		links: {
			imprint: 'Imprint',
			privacy: 'Privacy',
			blog: 'Blog',
			home: 'Portfolio',
		},
	},

	// Accessibility / ARIA Labels
	aria: {
		sections: {
			profile: 'Profile',
			projects: 'Projects',
			environment: 'Environment',
			contact: 'Contact',
			blog: 'Blog',
		},
		navigation: {
			legal: 'Legal pages navigation',
			languageSwitcher: {
				switchToGerman: 'Switch to German',
				switchToEnglish: 'Switch to English',
			},
			skipLinks: {
				skipToMain: 'Skip to main content',
				skipToNav: 'Skip to navigation',
			},
		},
		actions: {
			scrollToTop: 'Scroll to top',
			wcagCompliance: 'WCAG 2.2 AA Compliance Guidelines',
		},
	},

	// Cookie Consent
	cookieConsent: {
		consentModal: {
			title: 'We use cookies',
			description:
				'This website uses essential cookies for basic functionality. With your consent, we also use analytics cookies to improve the website.',
			acceptAll: 'Accept all',
			acceptNecessary: 'Necessary only',
			showSettings: 'Manage preferences',
			closeIconLabel: 'Close dialog',
		},
		preferencesModal: {
			title: 'Cookie Preferences',
			acceptAll: 'Accept all',
			acceptNecessary: 'Necessary only',
			save: 'Save preferences',
			closeIconLabel: 'Close modal',
			sections: [
				{
					title: 'Cookie Usage',
					description:
						'We use cookies to ensure basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in or opt-out.',
				},
				{
					title: 'Necessary Cookies <span class="cookie-badge">Always enabled</span>',
					description:
						'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
					linkedCategory: 'necessary',
				},
				{
					title: 'Analytics Cookies',
					description:
						'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
					linkedCategory: 'analytics',
				},
				{
					title: 'More Information',
					description:
						'For any questions regarding our cookie policy and your choices, please contact us at <a href="/en/privacy" class="terminal-link">Privacy</a>.',
				},
			],
		},
	},

	// Legal Pages
	legal: {
		imprint: {
			title: '▀▄▀▄ IMPRINT ▄▀▄▀',
			tmg: '[ § 5 TMG ]',
			contact: '[ CONTACT ]',
			responsible: '[ § 55 ABS. 2 RSTV ]',
			liability: '[ LIABILITY ]',
			liabilityContent: '// Liability for Content',
			liabilityContentText:
				'The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.',
			liabilityLinks: '// Liability for Links',
			liabilityLinksText:
				'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content.',
		},
		privacy: {
			title: '▀▄▀▄ PRIVACY ▄▀▄▀',
			overview: '[ OVERVIEW ]',
			overviewText:
				'The following information provides a simple overview of what happens to your personal data when you visit this website.',
			dataCollection: '[ DATA COLLECTION ]',
			whoResponsible: '// Who is responsible?',
			whoResponsibleText:
				'The data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.',
			howCollect: '// How do we collect your data?',
			howCollectText:
				'Your data is collected on the one hand by you providing it to us. This can be data that you enter into a contact form, for example.',
			howCollectText2:
				'Other data is collected automatically by our IT systems when you visit the website. This is mainly technical data (e.g. internet browser, operating system or time of page access).',
			hosting: '[ HOSTING ]',
			hostingText:
				"This website is hosted by an external service provider (hoster). The personal data collected on this website is stored on the hoster's servers.",
			cookies: '[ COOKIES ]',
			cookiesText:
				'Our website uses so-called "cookies". Cookies are small text files and do not cause any damage to your device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your device.',
			rights: '[ YOUR RIGHTS ]',
			rightsIntro: '// You have the right to:',
			rightsInfo: '→ Information about your stored data and its processing',
			rightsCorrection: '→ Correction of incorrect personal data',
			rightsDeletion: '→ Deletion of your data stored with us',
			rightsRestriction: '→ Restriction of data processing',
			rightsPortability: '→ Data portability',
			rightsObject: '→ Object to the processing',
			contact: '[ CONTACT ]',
			contactText:
				'If you have any questions about data protection, you can contact us at any time.',
		},
		nav: {
			backToPortfolio: '← back to portfolio',
			toImprint: 'imprint →',
			toPrivacy: 'privacy →',
		},
	},
} as const;
