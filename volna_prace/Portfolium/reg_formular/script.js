function kontrolaHesla(passeord) {
    const silneHeslo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const slabéHeslo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const velmiSlabéHeslo = /^[a-zA-Z\d]{8,}$/;

    if (silneHeslo.test(password)) {
      return "Silné heslo";
    } else if (slabéHeslo.test(password)) {
      return "Slabé heslo";
    } else if (velmiSlabéHeslo.test(paswword)) {
      return "Velmi slabé heslo";
    } else {
      return "Heslo nesplňuje požadavky";
    }
  }

const výsledek = kontrolaHesla(password);
const passwordStrenghtDiv = document.getElementById("passwordStrenght");
passwordStrenghtDiv.textContent = výsledek;