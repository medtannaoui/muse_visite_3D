

import * as THREE from 'three';

import {PRIMS3D} from './prims3d.js';
import {COMPS}   from './composants.js';
import {ACTEURS} from './acteurs.js';

class Monde {

    constructor(simu){
        this.simu  = simu ; 
        this.scene = simu.scene ;
        this.assets = {} ; 
    }
    genererPointsAleatoires(nbPoints = 5) {
    const points = [];
    for (let i = 0; i < nbPoints; i++) {
        points.push({
            x: (Math.random() - 0.5) * 18, // dans le musée
            z: (Math.random() - 0.5) * 18
        });
    }
    return points;
    }

    genese(){



        this.scene.add(new THREE.GridHelper(100,10));
        this.scene.add(new THREE.AxesHelper(5));

	    //const racine = this.simu.creerActeur("monde", ACTEURS.acteur,{}) ; 
	    //racine.incarnePar(this.scene) ; 
	
	    this.enregistrer("Parquet" , PRIMS3D.creerMateriau({couleur:"white",image:"assets/textures/sols_plafonds/parquet1.jpg",nx:20,ny:20})) ; 
	    this.enregistrer("Bleu"    , PRIMS3D.creerMateriau({couleur:"blue"})) ;
	    this.enregistrer("Vert"    , PRIMS3D.creerMateriau({couleur:0x00FF00})) ;
	    this.enregistrer("Rouge"    , PRIMS3D.creerMateriau({couleur:"red"})) ;
	    this.enregistrer("Dante"   , PRIMS3D.creerMateriau({couleur:"white",image:"assets/textures/murs/concrete.jpg"})) ;

    

    
        let i = 0;
        while(i<10){
            const x = (0.5-Math.random())*10 ; 
            const z = (0.5-Math.random())*10 ; 
            const y = 5; 
            const unActeur = this.simu.creerActeur('bulle'+i, ACTEURS.acteur,{}).
                             ajouterComposant(COMPS.sphere,{rayon:0.2}).
                             ajouterComposant(COMPS.position,{x:x,y:y,z:z});
            i += 1 ; 
        }


       const sol = this.simu.creerActeur("sol", ACTEURS.acteur,{}).
                      ajouterComposant(COMPS.sol,{largeur:20,longueur:20,materiau:this.chercher("Parquet")});
        
                // --- MURS DU MUSÉE (4 murs entourant le sol 20x20) ---
        const materiauMur = this.chercher("Dante"); // matériau béton

        // Mur Nord (à l’arrière)
        this.simu.creerActeur("murNord", ACTEURS.acteur, {})
            .ajouterComposant(COMPS.cloison, { largeur: 20, hauteur: 8, epaisseur: 0.1, materiau: materiauMur })
            .ajouterComposant(COMPS.position, { x: 0, y: 0, z: -10 });

        // Mur Sud (devant)
        this.simu.creerActeur("murSud", ACTEURS.acteur, {})
            .ajouterComposant(COMPS.cloison, { largeur: 20, hauteur: 8, epaisseur: 0.1, materiau: materiauMur })
            .ajouterComposant(COMPS.rotation, { y: Math.PI })
            .ajouterComposant(COMPS.position, { x: 0, y: 0, z: 10 });

        // Mur Est (droite)
        this.simu.creerActeur("murEst", ACTEURS.acteur, {})
            .ajouterComposant(COMPS.cloison, { largeur: 20, hauteur: 8, epaisseur: 0.1, materiau: materiauMur })
            .ajouterComposant(COMPS.rotation, { y: -Math.PI / 2 })
            .ajouterComposant(COMPS.position, { x: 10, y: 0, z: 0 });

        // Mur Ouest (gauche)const uneCloison = this.simu.creerActeur("cloison1", ACTEURS.acteur,{}).
        //                     ajouterComposant(COMPS.cloison,{epaisseur:0.01, materiau:this.chercher("Dante")}).
        //                     ajouterComposant(COMPS.position,{x:5,z:-5})
        this.simu.creerActeur("murOuest", ACTEURS.acteur, {})
            .ajouterComposant(COMPS.cloison, { largeur: 20, hauteur: 8, epaisseur: 0.1, materiau: materiauMur })
            .ajouterComposant(COMPS.rotation, { y: Math.PI / 2 })
            .ajouterComposant(COMPS.position, { x: -10, y: 0 ,z: 0 });

            

        // const unActeur = this.simu.creerActeur("tux", ACTEURS.acteur,{});
        // unActeur.ajouterComposant(COMPS.sphere,{materiau:this.chercher("Rouge")});
        // unActeur.ajouterComposant(COMPS.position,{x:5}).
        //          ajouterComposant(COMPS.alea,{dx:2});

        // const unAutreActeur = this.simu.creerActeur("tux1", ACTEURS.acteur,{}).
        //                       ajouterComposant(COMPS.sphere,{materiau:this.chercher("Vert")}).
        //                       ajouterComposant(COMPS.position,{y:2}).
        //                       ajouterComposant(COMPS.attacheA,{parent:"tux"});

            // Tableau sur le mur Nord
        
        
        // --- Tableaux sur le mur Est ---
        const nbPosters = 5;                // nombre de tableaux par mur
        const murLongueur = 20;             // largeur du mur
        const espacement = murLongueur / (nbPosters + 1);
        const hauteurMur = 5;
        const yPos = 2.5;

        // --- Mur Est ---
        const xPosEst = 9.9;                // position fixe du mur Est
        const zDebutEst = -murLongueur / 2; // début du mur (au fond)
        for (let i = 0; i < nbPosters; i++) {
            const name = `posterEst${i}`;
            const z = zDebutEst + (i + 1) * espacement;

            this.simu.creerActeur(name, ACTEURS.acteur, {})
                .ajouterComposant(COMPS.poster, {
                    largeur: 3,
                    hauteur: 2,
                    image: `./assets/images/${i + 1}.JPG`
                })
                .ajouterComposant(COMPS.rotation, { y: -Math.PI / 2 })
                .ajouterComposant(COMPS.position, { x: xPosEst, y: yPos, z });
        }

        // --- Mur Nord ---
        const zPosNord = -9.9;              // position fixe du mur Nord
        const xDebutNord = -murLongueur / 2;
        for (let i = 0; i < 2; i++) {
            const name = `posterNord${i}`;
            const x = xDebutNord + (i + 1) * espacement*2;

            this.simu.creerActeur(name, ACTEURS.acteur, {})
                .ajouterComposant(COMPS.poster, {
                    largeur: 3,
                    hauteur: 3,
                    image: `./assets/images/MAN00${i + 1}.jpg`
                })
                // rotation pour que les tableaux regardent vers le centre du musée
                .ajouterComposant(COMPS.rotation, { y: 0 })
                .ajouterComposant(COMPS.position, { x, y: yPos, z: zPosNord });
        }
        
        // --- Tableaux sur le mur Ouest ---
        const xPosOuest = -9.9;                 // position fixe du mur Ouest (à gauche)
        const zDebutOuest = -murLongueur / 2;   // début du mur
        for (let i = 0; i < nbPosters; i++) {
            const name = `posterOuest${i}`;
            const z = zDebutOuest + (i + 1) * espacement;

            this.simu.creerActeur(name, ACTEURS.acteur, {})
                .ajouterComposant(COMPS.poster, {
                    largeur: 3,
                    hauteur: 2,
                    image: `./assets/images/tableau${i + 1}.jpg`
                })
                // ✅ rotation vers le centre du musée (sens inverse du mur Est)
                .ajouterComposant(COMPS.rotation, { y: Math.PI / 2 })
                .ajouterComposant(COMPS.position, { x: xPosOuest, y: yPos, z });
        }


    //    const poster3 = this.simu.creerActeur("poster3", ACTEURS.acteur,{}).
    //                   ajouterComposant(COMPS.poster,{image:"./assets/images/3.JPG"}).
    //                   ajouterComposant(COMPS.position,{x:3,y:2});      

        // const uneCloison = this.simu.creerActeur("cloison1", ACTEURS.acteur,{}).
        //                     ajouterComposant(COMPS.cloison,{epaisseur:0.01, materiau:this.chercher("Dante")}).
        //                     ajouterComposant(COMPS.position,{x:5,z:-5})

        this.scene.add(PRIMS3D.creerSoleil());

        for (let i = 0; i < 10; i++) {
            const tuxName = "tux" + (i + 1);
            const points = this.genererPointsAleatoires(6); // 6 points par pingouin

            this.simu.creerActeur(tuxName, ACTEURS.newton, { masse: 10 })
                .ajouterComposant(COMPS.obj, {
                    repertoire: "./assets/obj/pingouin/",
                    obj: "penguin.obj",
                    mtl: "penguin.mtl"
                })
                // première position = premier point du parcours
                .ajouterComposant(COMPS.position, {
                    x: points[0].x,
                    y: 0.5,
                    z: points[0].z
                })
                .ajouterComposant(COMPS.steering, {
                    points: points,
                    vitesse: 0.01 + Math.random() * 0.02, // vitesse légèrement différente
                    tolerance: 0.3
                });
        }




    }

    enregistrer(nom,v){this.assets[nom]=v;}
    chercher(nom,defaut){return (this.assets[nom] || (defaut || null));} 
}

export {Monde} ; 
