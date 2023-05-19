class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  get numberOfOffspring() {
    return this.offspring.length;
  }

  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      numberOfVampires++;
      currentVampire = currentVampire.creator;
    }

    return numberOfVampires;
  }

  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }

    const thisAncestors = this.getAncestors();
    const otherAncestors = vampire.getAncestors();

    if (!thisAncestors || !otherAncestors) {
      return null;
    }

    let commonAncestor = null;

    for (let i = 0; i < thisAncestors.length; i++) {
      if (otherAncestors.includes(thisAncestors[i])) {
        commonAncestor = thisAncestors[i];
        break;
      }
    }

    return commonAncestor || this; 
  }

  getAncestors() {
    const ancestors = [];
    let currentVampire = this;

    while (currentVampire.creator) {
      ancestors.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }

    return ancestors;
  }
}

module.exports = Vampire;