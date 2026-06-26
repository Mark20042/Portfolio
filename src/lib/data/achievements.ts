// development
import swe from '$lib/images/certificates/development/swe.webp';
import frontend from '$lib/images/certificates/development/frontend.webp';
import swe_intern from '$lib/images/certificates/development/swe_intern.webp';
import rest_api from '$lib/images/certificates/development/restapi.webp';
import reacbasic from '$lib/images/certificates/development/reacbasic.webp';
import csharp from '$lib/images/certificates/development/csharp.webp';
import jsinter from '$lib/images/certificates/development/jsintermediate.webp';
import nodejsinter from '$lib/images/certificates/development/nodejsintermediate.webp';
import sqladvanced from '$lib/images/certificates/development/sqladvanced.webp';
import golanginter from '$lib/images/certificates/development/golanginter.webp';
import problemsolve from '$lib/images/certificates/development/problemsolvinginter.webp';
import rba from '$lib/images/certificates/development/rba.webp';
import sql from '$lib/images/certificates/development/sql.webp';
import jsessen from '$lib/images/certificates/development/jseessen.webp';
import htmlessen from '$lib/images/certificates/development/htmlessen.webp';

//schools certificate
import robotics from '$lib/images/certificates/schools/cert.webp';
import dl1 from '$lib/images/certificates/schools/dl1.webp';
import dl2 from '$lib/images/certificates/schools/dl2.webp';
import dl3 from '$lib/images/certificates/schools/dl3.webp';

//networking and cybersecurity
import networkingbasics from '$lib/images/certificates/networking/networkingbasics.webp';
import ethicalhacking from '$lib/images/certificates/networking/ethicalhacker.webp';
import juniorcybersec from '$lib/images/certificates/networking/juniorcybersec.webp';
import linuxessen from '$lib/images/certificates/networking/linuxessen.webp';
import cybersecintro from '$lib/images/certificates/networking/cybersectintro.webp';

/** Defines the structure for a single achievement item */
export interface AchievementItem {
	title: string;
	issuer: string;
	date: string;
	image: any; // Using 'any' because it's a dynamic import, 'string' is also fine
	featured?: boolean; // Controls if this certificate appears on the homepage
}

/** Defines the structure for a category/group of achievements */
export interface AchievementGroup {
	category: string;
	items: AchievementItem[];
}

// --- Data Export ---

export const achievementGroups: AchievementGroup[] = [
	{
		category: 'Software Development',
		items: [
			{
				title: 'Frontend Developer (React)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: frontend,
				featured: true
			},
			{
				title: 'Software Engineer',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: swe,
				featured: true
			},
			{
				title: 'Software Engineer Internship',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: swe_intern,
				featured: true
			},
			{
				title: 'Rest API Developer (Intermediate)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: rest_api
			},
			{
				title: 'SQL (Advanced)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: sqladvanced
			},
			{
				title: 'Node.js (Intermediate)',
				issuer: 'HackerRank',
				date: 'Nov 2025',
				image: nodejsinter
			},
			{
				title: 'JavaScript (Intermediate)',
				issuer: 'HackerRank',
				date: 'Nov 2025',
				image: jsinter
			},
			{
				title: 'GoLang (Intermediate)',
				issuer: 'HackerRank',
				date: 'Nov 2025',
				image: golanginter
			},
			{
				title: 'Problem Solving (Intermediate)',
				issuer: 'HackerRank',
				date: 'Nov 2025',
				image: problemsolve
			},
			{
				title: 'React (Basic)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: reacbasic
			},
			{
				title: 'C# (Basic)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: csharp
			},
			{
				title: 'SQL (Basic)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: sql
			},
			{
				title: 'Javascript Essentials II',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: jsessen,
				featured: true
			},
			{
				title: 'HTML Essentials',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: htmlessen
			},
			{
				title: 'RBA Project Management',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: rba
			}
		]
	},
	{
		category: 'Networking & Cybersecurity',
		items: [
			{
				title: 'Networking Basics',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: networkingbasics

			},
			{
				title: 'Ethical Hacker',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: ethicalhacking
			},
			{
				title: 'Junior Cyber Security Analyst',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: juniorcybersec
			},
			{
				title: 'Linux Essentials',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: linuxessen
			},
			{
				title: 'Cyber Security Introduction',
				issuer: 'Cisco Academy',
				date: 'Nov 2025',
				image: cybersecintro
			}
		]
	},
	{
		category: 'Scholastic & Extracurricular',
		items: [
			{
				title: 'Deans Lister 2nd Year (1st Semester)',
				issuer: 'Cebu Roosevelt Memorial Colleges',
				date: 'Apr 2025',
				image: dl3,
				featured: true
			},
			{
				title: 'Deans Lister 1st Year (2nd Semester)',
				issuer: 'Cebu Roosevelt Memorial Colleges',
				date: 'Apr 2025',
				image: dl2,
				featured: true
			},
			{
				title: 'Deans Lister 1st Year (1st Semester)',
				issuer: 'Cebu Roosevelt Memorial Colleges',
				date: 'Apr 2025',
				image: dl1
			},
			{
				title: 'Robotics',
				issuer: 'Cebu Roosevelt Memorial Colleges',
				date: 'Jan 2024',
				image: robotics
			}
		]
	}
];
