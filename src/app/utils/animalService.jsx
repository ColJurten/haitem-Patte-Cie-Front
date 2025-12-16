

export async function loadVetData() {
    const res = await fetch("http://localhost:3000/data/data.json");
    const json = await res.json();
    return json;
}

export async function getAnimalById(animalId) {

    const data = await loadVetData();

    if (!data) return null;

    const animal = data.animals.find(a => a.animal_id === animalId);
    if (!animal) return null;

    const owner = data.owners.find(o => o.owner_id === animal.owner_id);

    const visits = data.visits
        .filter(v => v.animal_id === animalId)
        .map(visit => {
            const vet = data.veterinarians.find(v => v.vet_id === visit.vet_id);
            return { ...visit, veterinarian: vet };
        });

    const vaccines = data.vaccines
        .filter(v => v.animal_id === animalId)
        .map(vaccine => {
            const vet = data.veterinarians.find(v => v.vet_id === vaccine.vet_id);
            return { ...vaccine, veterinarian: vet };
        });

    const allData = { animal, owner, visits, vaccines }

    console.log(allData)

    return allData;
}

export function defineSpecies(specie) {
    if (specie == "Chien") return "🐕";

    if (specie == "Chat") return "🐈";

    if (specie == "Lapin") return "🐇";

    return "❓";
}


export function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (years === 0) {
        return `${months} mois`;
    } else if (months === 0) {
        return `${years} an${years > 1 ? 's' : ''}`;
    } else {
        return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
    }
}

export async function getVetDashboardData(vetId) {
    const data = await loadVetData();

    if (!data) return null;
  
    const vet = data.veterinarians.find(v => v.vet_id === vetId);
    if (!vet) return null;
  
    const visits = data.visits.filter(v => v.vet_id === vetId);

    const today = new Date();

    const upcomingVisits = visits.filter(v => new Date(v.visit_date) > today);

    const pastVisits = visits.filter(v => new Date(v.visit_date) < today);

    const upcomingVisitsWithDetails = upcomingVisits
        .map(visit => {
            const animal = data.animals.find(a => a.animal_id === visit.animal_id);
            const owner = data.owners.find(o => o.owner_id === animal.owner_id);
            return { ...visit, animal, owner };
        })
        .sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date));

    const uniqueAnimals = new Set(visits.map(v => v.animal_id));

    const overdueVaccines = data.vaccines
        .filter(v => {
            const reminderDate = new Date(v.reminder_date);
            return reminderDate < today;
        })
        .map(vaccine => {
            const animal = data.animals.find(a => a.animal_id === vaccine.animal_id);
            const vet = data.veterinarians.find(v => v.vet_id === vaccine.vet_id);
            return { ...vaccine, animal, veterinarian: vet };
        });

    const upcomingVaccines = data.vaccines
        .filter(v => {
            const reminderDate = new Date(v.reminder_date);
            const diffTime = reminderDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 && diffDays <= 30;
        })
        .map(vaccine => {
            const animal = data.animals.find(a => a.animal_id === vaccine.animal_id);
            const vet = data.veterinarians.find(v => v.vet_id === vaccine.vet_id);
            return { ...vaccine, animal, veterinarian: vet };
        });

    const stats = {
        totalAnimals: uniqueAnimals.size,
        upcomingVisitsCount: upcomingVisits.length,
        overdueVaccinesCount: overdueVaccines.length,
        upcomingVaccinesCount: upcomingVaccines.length,
        pastVisitsCount: pastVisits.length
    };

    const allVaccinesWithStatus = data.vaccines
        .map(vaccine => {
            const animal = data.animals.find(a => a.animal_id === vaccine.animal_id);
            return { ...vaccine, animal };
        })
        .sort((a, b) => new Date(a.reminder_date) - new Date(b.reminder_date));

    return {
        vet,
        upcomingVisits: upcomingVisitsWithDetails.slice(0, 5),
        stats,
        overdueVaccines,
        upcomingVaccines,
        allVaccinesWithStatus
    };
}


export function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}h${minutes}`;
}

export function getRelativeDay(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = dateOnly - todayOnly;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === -1) return "Hier";
  
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return jours[date.getDay()];
}


export function getVaccineStatus(reminderDate) {
  const today = new Date();
  const reminder = new Date(reminderDate);

  today.setHours(0, 0, 0, 0);
  reminder.setHours(0, 0, 0, 0);
  
  const diffTime = reminder - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { text: `${diffDays}j`, status: 'red' };
  } else if (diffDays === 0) {
    return { text: "Aujourd'hui", status: 'red' };
  } else if (diffDays <= 30) {
    return { text: `Dans ${diffDays}j`, status: 'orange' };
  } else {
    return { text: 'À jour', status: 'green' };
  }
}