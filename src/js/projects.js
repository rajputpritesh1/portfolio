document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  
    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
            item.style.display = 'block';
            item.setAttribute('data-aos', 'fade-up');
          } else {
            item.style.display = 'none';
            item.removeAttribute('data-aos');
          }
        });
        
        // Refresh AOS to animate newly visible items
        AOS.refresh();
      });
    });
  
    // Project modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    
  
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on links
        if (e.target.closest('.project-link')) return;
        
        const projectTitle = card.querySelector('h3').textContent;
        const projectData = projectsData[projectTitle];
        
        if (projectData) {
          // Populate modal with project data
          document.getElementById('modalProjectImage').src = projectData.image;
          document.getElementById('modalProjectImage').alt = projectTitle;
          document.getElementById('modalProjectTitle').textContent = projectTitle;
          document.getElementById('modalProjectCategory').textContent = projectData.category;
          document.getElementById('modalProjectDate').textContent = projectData.date;
          document.getElementById('modalProjectDescription').textContent = projectData.description;
          
          const featuresList = document.getElementById('modalProjectFeatures');
          featuresList.innerHTML = '';
          projectData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
          });
          
          const techStack = document.getElementById('modalProjectTech');
          techStack.innerHTML = '';
          projectData.tech.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techStack.appendChild(span);
          });
          
          document.getElementById('modalLiveLink').href = projectData.liveLink;
          document.getElementById('modalCodeLink').href = projectData.codeLink;
          
          // Show modal
          projectModal.show();
        }
      });
    });
  
    // Load more projects functionality
    const loadMoreBtn = document.querySelector('.btn-load-more');
    let visibleProjects = 6; // Initial number of visible projects
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        // In a real implementation, you would fetch more projects from an API
        // For this example, we'll just simulate loading more projects
        visibleProjects += 3;
        
        // Show all projects up to the new visible count
        document.querySelectorAll('.project-item').forEach((item, index) => {
          if (index < visibleProjects) {
            item.style.display = 'block';
            item.setAttribute('data-aos', 'fade-up');
          } else {
            item.style.display = 'none';
            item.removeAttribute('data-aos');
          }
        });
        
        // Hide button if all projects are visible
        if (visibleProjects >= document.querySelectorAll('.project-item').length) {
          loadMoreBtn.style.display = 'none';
        }
        
        AOS.refresh();
      });
    }
  
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  });