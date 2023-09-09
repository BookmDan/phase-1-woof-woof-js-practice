// document.addEventListener('DOMContentLoaded', () => {
//   const dogBar = documetn.getElementById('dog-bar');

//   // fetch all pup data from server
//   fetch('http://localhost:3000/pups')
//     .then((response) => response.json())
//     .then((data) => {
//       // iterate and add span for each pup's name
//       data.forEach((pup) => {
//         const pupSpan = document.createElement('span');
//         pupSpan.textContent = pup.name;
// // handle click on pup's name
//         pupSpan.addEventListener('click', () => {
//           displayPupInfo(pup)
//         })
//         // always append the span to bigger container
//         dogBar.appendChild(pupSpan);
//     })
//     })
//     .catch((err) => {
//       console.error('Error fetching pup data', err);
//   })
// })

// // display pup in dog-info div
// function displayPupInfo(pup) {
//   dogInfo.innerHTML = ''; // make blank 

//   // append img tag
//   const img = document.createElement('img');
//   img.src = pup.image;
//   dogInfo.appendChild(img);

//   const h2 = document.createElement('h2');
//   h2.textContext = pup.name;
//   dogInfo.appendChild(h2);

//   const button = document.createElement('button');
//   button.textContent = pup.isGoodDog ? 'Good Dog' : 'Bad Dog!';
//   button.addEventListener('click', () => {
//     toggleGoodDogStatus(pup);
//   })
//   dogInfo.appenChild(button)
// }

// function toggleGoodDogStatus(pup) {
//   // implement logic 
//   // make patch request
//   pup.isGoodDog = !pup.isGoodDog;
//   fetch(`http://localhost:3000/pups/${pup.id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
//   })
//     .then(() => {
//       // Update the button text
//       const button = dogInfo.querySelector('button');
//       button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
//     })
//     .catch((error) => {
//       console.error('Error updating pup:', error);
//     });
// }

// // Event listener for the "Filter Good Dogs" button
// filterButton.addEventListener('click', () => {
//   filterOn = !filterOn; // Toggle the filter state
//   filterButton.textContent = filterOn ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';

//   // Clear the dog bar
//   dogBar.innerHTML = '';

//   // Fetch and display pups based on the filter
//   fetch('http://localhost:3000/pups')
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((pup) => {
//         if (!filterOn || (filterOn && pup.isGoodDog)) {
//           const pupSpan = document.createElement('span');
//           pupSpan.textContent = pup.name;
//           pupSpan.addEventListener('click', () => {
//             // Display pup info when a span is clicked
//             displayPupInfo(pup);
//           });
//           dogBar.appendChild(pupSpan);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error('Error fetching pups:', error);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.getElementById('dog-bar');
  const dogInfo = document.getElementById('dog-info');
  const filterButton = document.getElementById('filter-button');
  let filterOn = false; // Initially, the filter is off

  // Fetch and add pups to the dog bar
  fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pup) => {
        const pupSpan = document.createElement('span');
        pupSpan.textCoentent = pup.name;
        pupSpan.addEventListener('click', () => {
          // Display pup info when a span is clicked
          displayPupInfo(pup);
        });
        dogBar.appendChild(pupSpan);
      });
    })
    .catch((error) => {
      console.error('Error fetching pups:', error);
    });

  // Function to display pup info
  function displayPupInfo(pup) {
    dogInfo.innerHTML = ''; // Clear previous content

    const img = document.createElement('img');
    img.src = pup.image;

    const h2 = document.createElement('h2');
    h2.textContent = pup.name;

    const button = document.createElement('button');
    button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    button.addEventListener('click', () => {
      // Toggle Good Dog/Bad Dog status and update the database
      toggleGoodDogStatus(pup);
    });

    dogInfo.appendChild(img);
    dogInfo.appendChild(h2);
    dogInfo.appendChild(button);
  }

  // Function to toggle Good Dog status and update the database
  function toggleGoodDogStatus(pup) {
    pup.isGoodDog = !pup.isGoodDog;
    fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
    })
      .then(() => {
        // Update the button text
        const button = dogInfo.querySelector('button');
        button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
      })
      .catch((error) => {
        console.error('Error updating pup:', error);
      });
  }

  // Event listener for the "Filter Good Dogs" button
  filterButton.addEventListener('click', () => {
    filterOn = !filterOn; // Toggle the filter state
    filterButton.textContent = filterOn ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';

    // Clear the dog bar
    dogBar.innerHTML = '';

    // Fetch and display pups based on the filter
    fetch('http://localhost:3000/pups')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((pup) => {
          if (!filterOn || (filterOn && pup.isGoodDog)) {
            const pupSpan = document.createElement('span');
            pupSpan.textContent = pup.name;
            pupSpan.addEventListener('click', () => {
              // Display pup info when a span is clicked
              displayPupInfo(pup);
            });
            dogBar.appendChild(pupSpan);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching pups:', error);
      });
  });
});
