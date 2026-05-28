// development
import swe from '$lib/images/certificates/development/swe.png';
import frontend from '$lib/images/certificates/development/frontend.png';
import swe_intern from '$lib/images/certificates/development/swe_intern.png';
import rest_api from '$lib/images/certificates/development/restapi.png';
import reacbasic from '$lib/images/certificates/development/reacbasic.png';
import csharp from '$lib/images/certificates/development/csharp.png';
import jsinter from '$lib/images/certificates/development/jsintermediate.png';
import nodejsinter from '$lib/images/certificates/development/nodejsintermediate.png';
import sqladvanced from '$lib/images/certificates/development/sqladvanced.png';
import golanginter from '$lib/images/certificates/development/golanginter.png';
import problemsolve from '$lib/images/certificates/development/problemsolvinginter.png';
import rba from '$lib/images/certificates/development/rba.jpg';
import sql from '$lib/images/certificates/development/sql.png';
import jsessen from '$lib/images/certificates/development/jseessen.png';
import htmlessen from '$lib/images/certificates/development/htmlessen.png';

//schools certificate
import robotics from '$lib/images/certificates/schools/cert.jpg';
import dl1 from '$lib/images/certificates/schools/dl1.jpg';
import dl2 from '$lib/images/certificates/schools/dl2.jpg';
import dl3 from '$lib/images/certificates/schools/dl3.jpg';

//networking and cybersecurity
import networkingbasics from '$lib/images/certificates/networking/networkingbasics.png';
import ethicalhacking from '$lib/images/certificates/networking/ethicalhacker.png';
import juniorcybersec from '$lib/images/certificates/networking/juniorcybersec.png';
import linuxessen from '$lib/images/certificates/networking/linuxessen.png';
import cybersecintro from '$lib/images/certificates/networking/cybersectintro.png';

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
