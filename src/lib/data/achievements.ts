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
import softwareengineer from '$lib/images/certificates/development/softwareengineer.png';
import solutionandarchitecture from '$lib/images/certificates/development/solutionandarchitecture.png';
import embeddedsystem from '$lib/images/certificates/development/embeddedsystem.png';
import laravel from '$lib/images/certificates/development/laravel.png';
import expressjs from '$lib/images/certificates/development/expressjs.png';
import reactnative from '$lib/images/certificates/development/reactnative.png';
import restapis from '$lib/images/certificates/development/restapis.png';
import oop from '$lib/images/certificates/development/oop.png';

//schools certificate
import robotics from '$lib/images/certificates/schools/cert.webp';
import dl1 from '$lib/images/certificates/schools/dl1.webp';
import dl2 from '$lib/images/certificates/schools/dl2.webp';
import dl3 from '$lib/images/certificates/schools/dl3.webp';


// data science 
import aiengineer from '$lib/images/certificates/datascience/aiengineer.png';
import llmengineer from '$lib/images/certificates/datascience/llmengineer.png';
import promptengineer from '$lib/images/certificates/datascience/promptengineer.png';
import datascience from '$lib/images/certificates/datascience/datascience.png';
import deeplearning from '$lib/images/certificates/datascience/deeplearning.png';
import machinelearning from '$lib/images/certificates/datascience/machinelearning.png';
import aiagent from '$lib/images/certificates/datascience/aiagent.png';

// cloud and devops
import aws from '$lib/images/certificates/clouddevops/aws.png';
import azure from '$lib/images/certificates/clouddevops/azure.png';
import git from '$lib/images/certificates/clouddevops/git.png';

//networking and cybersecurity
import networkingbasics from '$lib/images/certificates/networking/networkingbasics.webp';
import ethicalhacking from '$lib/images/certificates/networking/ethicalhacker.webp';
import juniorcybersec from '$lib/images/certificates/networking/juniorcybersec.webp';
import linuxessen from '$lib/images/certificates/networking/linuxessen.webp';
import cybersecintro from '$lib/images/certificates/networking/cybersectintro.webp';
import coap from '$lib/images/certificates/cybersec/apipentester.png';
import webpt from '$lib/images/certificates/cybersec/webpenetrationtester.png';
import netops from '$lib/images/certificates/cybersec/netops.png';

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
				title: 'Rest API Developer (Intermediate)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: rest_api,
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
				title: 'Software Engineer',
				issuer: 'Tesdome',
				date: 'Sept 2026',
				image: softwareengineer,
				featured: true
			},
			{
				title: "Solution and Architecture",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: solutionandarchitecture,
				featured: true
			},
			{
				title: "Embedded System",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: embeddedsystem,
				featured: true
			},
			{
				title: "Laravel",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: laravel,
				featured: true
			},
			{
				title: "Express.JS",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: expressjs,
				
			},
			{
				title: "React Native",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: reactnative,
				
			},
			{
				title: "OOP",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: oop,
			},
			{
				title: "Rest API",
				issuer: "Tesdome",
				date: "Sept 2026",
				image: restapis,
			},
			{
				title: 'Frontend Developer (React)',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: frontend,
				
			},
			{
				title: 'Software Engineer Internship',
				issuer: 'HackerRank',
				date: 'Oct 2025',
				image: swe_intern,
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
				image: jsessen
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
			},
			
			
		]
	},
	{
		category: "AI & Data Science",
		items: [
			{
				title: "AI Engineer",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: aiengineer,
				featured: true
			},
			{
				title: "LLM Engineer",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: llmengineer,
				featured: true
			},
			{
				title: "Prompt Engineer",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: promptengineer,
				featured: true
			},
			{
				title: "Data Science",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: datascience,
				
			},
			{
				title: "Deep Learning",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: deeplearning,
			
			},
			{
				title: "Machine Learning",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: machinelearning,
			
			},
			{
				title: "AI Agent",
				issuer: "Tesdome",
				date: "Oct 2026",
				image: aiagent,
			}
		]

	},
	{
		category: 'Networking & Cybersecurity',
		items: [
			{
				title: 'Certified Offensive API Pentester (COAP)',
				issuer: 'AppKademiya',
				date: 'Aug 2026',
				image: coap,
				featured: true
			},
			{
				title: 'Web Penetration Tester',
				issuer: 'AppKademiya',
				date: 'Aug 2026',
				image: webpt,
				featured: true
			},
			{
				title: 'Certified Network Operations Engineer',
				issuer: 'AppKademiya',
				date: 'Aug 2026',
				image: netops,
				featured: true
			},
			
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
			},

		]
	},
	{
		category: 'Cloud & DevOps',
		items: [
			{
				title: " Amazon Web Services",
				issuer: 'Tesdome',
				date: 'Sept 2026',
				image: aws,
				featured: true
			},
			{
				title: " Microsoft Azure",
				issuer: 'Tesdome',
				date: 'Sept 2026',
				image: azure,
				featured: true
			},
			{
				title: " Git",
				issuer: 'Tesdome',
				date: 'Sept 2026',
				image: git,
				featured: true
			},
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
			},
			{
				title: 'Deans Lister 1st Year (2nd Semester)',
				issuer: 'Cebu Roosevelt Memorial Colleges',
				date: 'Apr 2025',
				image: dl2,
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
