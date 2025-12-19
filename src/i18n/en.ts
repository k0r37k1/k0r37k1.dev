export default {
	// Navigation & Header
	header: {
		title: 'visitor@k0r37k1.dev:~$ cat portfolio.txt',
	},

	// Hero Section
	hero: {
		greeting: "Hi, I'm",
		name: 'k0r37k1',
		welcome: 'Welcome to my personal portfolio',
		subtitle: 'Developer • AI Enthusiast • Problem Solver',
		tagline: 'Full-Stack Developer & Digital Craftsman',
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
		skills: '▀▄▀▄ SKILLS ▄▀▄▀',
		contact: '▀▄▀▄ CONTACT ▄▀▄▀',
	},

	// About Section
	about: {
		who: {
			label: '[ WHO ]',
			text: 'Full-stack developer with a passion for building clean, performant web applications. Specialized in modern frontend architectures and developer experience.',
		},
		what: {
			label: '[ WHAT ]',
			text: 'Crafting pixel-perfect interfaces with Vue/Nuxt, React, and Flutter. Building scalable backends with PHP and TypeScript. Obsessed with accessibility, performance, and clean code.',
		},
		now: {
			label: '[ NOW ]',
			text: "Exploring AI-assisted development workflows, contributing to open source, and pushing the boundaries of what's possible with modern web technologies.",
		},
	},

	// Projects Section
	projects: {
		viewProject: 'View Project',
		sourceCode: 'Source Code',
		technologies: 'Technologies',
		stack: 'Stack:',
		github: 'GitHub',
		liveDemo: 'Live Demo',
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
		},
	},

	// Contact Section
	contact: {
		title: "Let's Work Together",
		description:
			"Have a project in mind? I'm always open to new challenges and interesting collaborations.",
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
