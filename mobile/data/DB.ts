export interface Cours {
    id: number
    titre: string
    image: string
}

export interface Tontine {
    id: number
    nom: string
    participants: number
    date_debut: string
    montant: string
    statut: string
}

export const COURS: Cours[] = [  
    {  
        id: 1,  
        titre: "Introduction à la Programmation",  
        image: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/09/intro-to-programming.jpg"  
    },  
    {  
        id: 2,  
        titre: "Développement Web",  
        image: "https://www.w3schools.com/w3images/lights.jpg"  
    },  
    {  
        id: 3,  
        titre: "Data Science",  
        image: "https://miro.medium.com/v2/resize:fit:1200/format:webp/1*0g8g0g8g0g8g0g8g0g8g0g.png"  
    },  
    {  
        id: 4,  
        titre: "Intelligence Artificielle",  
        image: "https://www.analyticsvidhya.com/wp-content/uploads/2021/06/AI-1.png"  
    },  
    {  
        id: 5,  
        titre: "Bien garder son argent",  
        image: "https://www.creativebloq.com/bypass/creativebloq/2021/03/graphic-design-hero.jpg"  
    }  ,
    {  
        id: 6,  
        titre: "Devenir un ceack du code",  
        image: "https://www.creativebloq.com/bypass/creativebloq/2021/03/graphic-design-hero.jpg"  
    },
    {  
        id: 7,  
        titre: "Manger beaucoup de fruits   ",  
        image: "https://www.creativebloq.com/bypass/creativebloq/2021/03/graphic-design-hero.jpg"  
    }  
];  

export const TONTINES: Tontine[] = [  
    {  
      id: 1,  
      nom: "Tontine_Connect",  
      participants: 5,  
      date_debut: "5 novembre 2024",  
      montant: "5000 FCFA",  
      statut: "En Cours", // Vous pouvez changer le statut selon vos besoins  
    },  
    {  
      id: 2,  
      nom: "Tontine_Solidarité",  
      participants: 10,  
      date_debut: "15 décembre 2024",  
      montant: "3000 FCFA",  
      statut: "Complète",  
    },  
    {  
      id: 3,  
      nom: "Tontine_Avenir",  
      participants: 8,  
      date_debut: "1er janvier 2025",  
      montant: "7000 FCFA",  
      statut: "En Attente",  
    },  
    {  
      id: 4,  
      nom: "Tontine_Famille",  
      participants: 6,  
      date_debut: "20 janvier 2025",  
      montant: "4000 FCFA",  
      statut: "Terminée",  
    },  
    {  
      id: 5,  
      nom: "Tontine_Progrès",  
      participants: 12,  
      date_debut: "10 février 2025",  
      montant: "6000 FCFA",  
      statut: "Suspendue",  
    },  
  ];