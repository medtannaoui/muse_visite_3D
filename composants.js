import * as THREE from 'three';

import {PRIMS3D} from './prims3d.js'

class Composant {

    constructor(params, acteur){
        this.acteur = acteur ; 
    }

    devenirRecurrent(){
        this.acteur.composants.push(this);
    }

    executer(){}

}

// Composants d'animation
// ======================

class Alea extends Composant {
    
    constructor(params, acteur){
        super(params, acteur);
        this.devenirRecurrent() ; 
        this.p        = params.p || 0.1 ; 
        this.dx       = params.dx || 1.0 ; 
        this.position = new THREE.Vector3(0,0,0);
    }

    executer(){
        const p = Math.random() ; 
        if(p<this.p){
            this.acteur.getPosition(this.position);
            this.position.x += (0.5-Math.random())*0.1 ; 
            this.acteur.setPosition(this.position);
        }
    }
}

class MouvementAleatoire extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        this.devenirRecurrent();
        this.puissance = params.puissance || 10.0 ;
        this.alea      = params.alea      || 1.0 ; 
        this.force     = new THREE.Vector3(0,0,0);
    }

    executer(){
        const p = Math.random() ; 
        if(p<this.alea){
            this.acteur.appliquerForce(this.force);
            const x = (0.5-Math.random());
            const z = (0.5-Math.random());
            this.force.set(x,0,z);
            this.force.normalize() ;
            this.force.multiplyScalar(this.puissance);
            this.acteur.appliquerForce(this.force);
        }
    }

}

class RegardesLaOuTuVas extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        this.devenirRecurrent();
        this.cible = new THREE.Vector3(0,0,0);
    }

    executer(){
        this.cible.copy(this.acteur.objet3d.position);
        this.cible.addScaledVector(this.acteur.vitesse,1.0);
        this.acteur.objet3d.lookAt(this.cible);
    }

}




// Composants de création d'objets 3d
// ==================================

class Sphere extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        params = params || {} ; 
        const centre = params.centre || {} ; 
        const rayon  = params.rayon  || 0.5 ; 
        const materiau = params.materiau || PRIMS3D.filDeFer ; 

	    const sph = PRIMS3D.creerSphere("sphere",{rayon:rayon,materiau:materiau}) ; 
	    acteur.incarnePar(sph) ;  
    }

}

class Cloison extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        params = params || {} ; 
        const larg   = params.largeur    || 5.0 ; 
        const haut   = params.hauteur    || 3.0 ; 
        const epais  = params.epaisseur  || 0.05 ;
        const materiau = params.materiau || Prims3D.filDeFer ;   

        const cloison = PRIMS3D.creerCloison("cloison", {materiau:materiau,hauteur:haut, largeur:larg, epaisseur:epais});
        acteur.incarnePar(cloison);
         
    }

}

class Sol extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        params = params || {} ; 
        const larg     = params.largeur    || 100.0 ; 
        const prof     = params.profondeur || 100.0 ; 
        const materiau = params.materiau   || Prims3D.filDeFer ;

        const sol = PRIMS3D.creerSol("sol",{largeur:larg,longueur:prof,materiau});
        acteur.incarnePar(sol) ;  

         
    }

}


class Poster extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        params = params || {};
        const largeur  = params.largeur || 1.0 ; 
        const hauteur  = params.hauteur || 1.0 ; 
        const nomImage = params.image ; 

        const poster = PRIMS3D.creerPoster("poster",{largeur:largeur, hauteur:hauteur, nomImage:nomImage}) ;

        acteur.incarnePar(poster);
    }
}




class Obj extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        const obj = PRIMS3D.chargerOBJ("obj", params.repertoire, params.obj, params.mtl);
        this.acteur.incarnePar(obj);
    }
}

// Composants de placement
// =======================

class Position extends Composant{

    constructor(params, acteur){
        super(params, acteur);
        const x = params.x || 0.0 ; 
        const y = params.y || 0.0 ; 
        const z = params.z || 0.0 ; 
        acteur.placeEn(x,y,z);
    }
}

class Rotation extends Composant{

    constructor(params, acteur){
        super(params, acteur);
        const x = params.x || 0.0 ; 
        const y = params.y || 0.0 ; 
        const z = params.z || 0.0 ; 
        acteur.orienteSelon(x,y,z);
    }
}

class AttacheA extends Composant {

    constructor(params, acteur){
        super(params, acteur);
        const nomParent = params.parent || null ; 

        if(nomParent != null){
            const parent = acteur.simu.chercher(nomParent) ; 
            if(parent){
                acteur.attacheA(parent) ; 
            }
        }
    }

}



const COMPS = {
    alea         : Alea,
    mouvementAleatoire : MouvementAleatoire,
    regardesLaOuTuVas : RegardesLaOuTuVas,
    position     : Position,
    rotation     : Rotation,
    attacheA     : AttacheA,
    poster       : Poster,
    sphere       : Sphere,
    cloison      : Cloison,
    sol          : Sol,
    obj          : Obj,
    comp         : Composant
} ; 

export {COMPS} ; 
