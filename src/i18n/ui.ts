export interface CardItem {
	title: string;
	body: string;
	note?: string;
}

export interface Dictionary {
	seo: {
		title: string;
		description: string;
	};
	header: {
		nav: {
			whatWeDo: string;
			areas: string;
			howWeWork: string;
			contact: string;
		};
	};
	hero: {
		eyebrow: string;
		headline: string;
		intro: string;
		cta: string;
	};
	mission: {
		eyebrow: string;
		heading: string;
		body: string;
	};
	whatWeDo: {
		eyebrow: string;
		heading: string;
		items: [CardItem, CardItem, CardItem, CardItem];
	};
	areas: {
		eyebrow: string;
		heading: string;
		intro: string;
		items: [CardItem, CardItem, CardItem, CardItem];
	};
	howWeWork: {
		eyebrow: string;
		heading: string;
		body: string;
		bodySecondary: string;
		principles: [string, string, string, string, string];
	};
	contact: {
		eyebrow: string;
		heading: string;
		body: string;
		emailLabel: string;
	};
	footer: {
		legalHeading: string;
		contactHeading: string;
	};
}
