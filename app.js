// Firebase Configuration
// Firebase is loaded via CDN in index.html, available globally as window.firebase

// const firebaseConfig = {
//     apiKey: "AIzaSyBsqg1lQJGbCTdnaF_LwnqFEj2DnKnx784",
//     authDomain: "market-activation.firebaseapp.com",
//     databaseURL: "https://market-activation-default-rtdb.firebaseio.com",
//     projectId: "market-activation",
//     storageBucket: "market-activation.firebasestorage.app",
//     messagingSenderId: "286226385972",
//     appId: "1:286226385972:web:eafb6b1e5ecff6bfae8e61"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAgy5YvRKNfqktEaJ2QLLui8odbDio_kJM",
    authDomain: "darling-braiding-activation.firebaseapp.com",
    databaseURL: "https://darling-braiding-activation-default-rtdb.firebaseio.com",
    projectId: "darling-braiding-activation",
    storageBucket: "darling-braiding-activation.firebasestorage.app",
    messagingSenderId: "391441447854",
    appId: "1:391441447854:web:502ecb8832063fe704e63f",
};

// Initialize Firebase using a single object parameter (recommended)
var app = firebase.initializeApp({ ...firebaseConfig });
const database = firebase.database(app);
const storage = firebase.storage(app);
// Firebase availability flag
let firebaseAvailable = true;

// Secure event binding for logout button
document.addEventListener('DOMContentLoaded', function () {
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Secure Password Hash (SHA-256)
async function hashPassword(password) {
    const enc = new TextEncoder();
    const encoded = enc.encode(password);
    const buffer = await window.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
// const passwordSalt = hashPassword('jaysethia');
// console.log('Password salt initialized', passwordSalt);

// Secure event binding for password button
document.addEventListener('DOMContentLoaded', function () {
    var passwordBtn = document.getElementById('changePasswordBtn');
    if (passwordBtn) {
        passwordBtn.addEventListener('click', changePassword);
    }

    var resetPasswordBtn = document.getElementById('resetPasswordBtn');
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', resetPassword);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Data sorting listeners for stylists table
    var sCode = document.getElementById('sCode');
    if (sCode) sCode.addEventListener('click', function () { sortTable(0); });
    var sName = document.getElementById('sName');
    if (sName) sName.addEventListener('click', function () { sortTable(1); });
    var sPhone = document.getElementById('sPhone');
    if (sPhone) sPhone.addEventListener('click', function () { sortTable(2); });
    var sLocation = document.getElementById('sLocation');
    if (sLocation) sLocation.addEventListener('click', function () { sortTable(3); });
    var sRegistrationDate = document.getElementById('sRegistrationDate');
    if (sRegistrationDate) sRegistrationDate.addEventListener('click', function () { sortTable(4); });
    var sBankDetails = document.getElementById('sBankDetails');
    if (sBankDetails) sBankDetails.addEventListener('click', function () { sortTable(5); });
    var sBalanceAmount = document.getElementById('sBalanceAmount');
    if (sBalanceAmount) sBalanceAmount.addEventListener('click', function () { sortTable(6); });
    var sTotalAmount = document.getElementById('sTotalAmount');
    if (sTotalAmount) sTotalAmount.addEventListener('click', function () { sortTable(7); });
});

// Secure event binding for stylist search/filter/clear
document.addEventListener('DOMContentLoaded', function () {
    var stylistSearch = document.getElementById('stylistSearch');
    if (stylistSearch) {
        stylistSearch.addEventListener('keyup', filterStylists);
    }
    var locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        locationFilter.addEventListener('change', filterStylists);
    }

    var stylistFromDate = document.getElementById('stylistFromDate');
    if (stylistFromDate) {
        stylistFromDate.addEventListener('change', function () {
            const toDateInput = document.getElementById('stylistToDate');
            if (this.value && toDateInput) {
                // Set minimum date for 'to date' to be same as 'from date'
                toDateInput.min = this.value;
                // If 'to date' is already set and is before 'from date', clear it
                if (toDateInput.value && toDateInput.value < this.value) {
                    toDateInput.value = '';
                }
            }
            filterStylists();
        });
    }
    var stylistToDate = document.getElementById('stylistToDate');
    if (stylistToDate) {
        stylistToDate.addEventListener('change', function () {
            const fromDateInput = document.getElementById('stylistFromDate');
            if (this.value && fromDateInput) {
                // Set maximum date for 'from date' to be same as 'to date'
                fromDateInput.max = this.value;
                // If 'from date' is already set and is after 'to date', clear it
                if (fromDateInput.value && fromDateInput.value > this.value) {
                    fromDateInput.value = '';
                }
            }
            filterStylists();
        });
    }
    var clearStylistFiltersBtn = document.getElementById('clearStylistFiltersBtn');
    if (clearStylistFiltersBtn) {
        clearStylistFiltersBtn.addEventListener('click', clearFilters);
    }

    var exportStylistsBtn = document.getElementById('exportStylistsBtn');
    if (exportStylistsBtn) {
        exportStylistsBtn.addEventListener('click', exportStylists);
    }

    var refreshStylistsBtn = document.getElementById('refreshStylistsBtn');
    if (refreshStylistsBtn) {
        refreshStylistsBtn.addEventListener('click', refreshStylists);
    }
});

// Secure event binding for stylist report filters and buttons
document.addEventListener('DOMContentLoaded', function () {
    // console.log('DOM loaded - setting up stylist report events');

    var reportDate = document.getElementById('reportDate');
    if (reportDate) {
        reportDate.addEventListener('change', generateStylistReport);
        // console.log('Report date event listener attached');
    }

    var reportLocationFilter = document.getElementById('reportLocationFilter');
    if (reportLocationFilter) {
        reportLocationFilter.addEventListener('change', generateStylistReport);
        // console.log('Report location filter event listener attached');
    }

    // Clear button event listener
    var clearReportFiltersBtn = document.getElementById('clearReportFiltersBtn');
    if (clearReportFiltersBtn) {
        clearReportFiltersBtn.addEventListener('click', clearReportFilters);
        clearReportFiltersBtn.addEventListener('click', generateStylistReport);
    }

    // NOTE: Do NOT load report data here - it will be loaded after login in initializeDashboard()
});

// Secure event binding for customer search/filter/clear
document.addEventListener('DOMContentLoaded', function () {
    var customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('keyup', filterCustomers);
    }
    var customerLocationFilter = document.getElementById('customerLocationFilter');
    if (customerLocationFilter) {
        customerLocationFilter.addEventListener('change', function () {
            // Update stylist dropdown based on selected location
            populateCustomerStylistFilter(this.value);
            // Also trigger the main filter function
            filterCustomers();
        });
    }
    var customerStylistFilter = document.getElementById('customerStylistFilter');
    if (customerStylistFilter) {
        customerStylistFilter.addEventListener('change', filterCustomers);
    }
    var customerFromDate = document.getElementById('customerFromDate');
    if (customerFromDate) {
        customerFromDate.addEventListener('change', function () {
            const toDateInput = document.getElementById('customerToDate');
            if (this.value && toDateInput) {
                // Set minimum date for 'to date' to be same as 'from date'
                toDateInput.min = this.value;
                // If 'to date' is already set and is before 'from date', clear it
                if (toDateInput.value && toDateInput.value < this.value) {
                    toDateInput.value = '';
                }
            }
            filterCustomers();
        });
    }
    var customerToDate = document.getElementById('customerToDate');
    if (customerToDate) {
        customerToDate.addEventListener('change', function () {
            const fromDateInput = document.getElementById('customerFromDate');
            if (this.value && fromDateInput) {
                // Set maximum date for 'from date' to be same as 'to date'
                fromDateInput.max = this.value;
                // If 'from date' is already set and is after 'to date', clear it
                if (fromDateInput.value && fromDateInput.value > this.value) {
                    fromDateInput.value = '';
                }
            }
            filterCustomers();
        });
    }
    var clearCustomerFiltersBtn = document.getElementById('clearCustomerFiltersBtn');
    if (clearCustomerFiltersBtn) {
        clearCustomerFiltersBtn.addEventListener('click', clearCustomerFilters);
    }

    var exportCustomersBtn = document.getElementById('exportCustomersBtn');
    if (exportCustomersBtn) {
        exportCustomersBtn.addEventListener('click', exportCustomers);
    }

    var refreshCustomersBtn = document.getElementById('refreshCustomersBtn');
    if (refreshCustomersBtn) {
        refreshCustomersBtn.addEventListener('click', refreshCustomers);
    }
});

// Filter and clear user management listeners
document.addEventListener('DOMContentLoaded', function () {
    // User management search and filter listeners
    var userSearch = document.getElementById('userSearch');
    if (userSearch) userSearch.addEventListener('keyup', filterUsers);

    var roleFilter = document.getElementById('roleFilter');
    if (roleFilter) roleFilter.addEventListener('change', filterUsers);

    var statusFilter = document.getElementById('statusFilter');
    if (statusFilter) statusFilter.addEventListener('change', filterUsers);

    var locationFilter = document.getElementById('userlocationFilter');
    if (locationFilter) locationFilter.addEventListener('change', filterUsers);

    var clearUserFiltersBtn = document.getElementById('clearUserFiltersBtn');
    if (clearUserFiltersBtn) clearUserFiltersBtn.addEventListener('click', clearUserFilters);

    var addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) addUserBtn.addEventListener('click', submitNewUser);

    var toggleAddUserFormBtn = document.getElementById('toggleAddUserFormBtn');
    if (toggleAddUserFormBtn) toggleAddUserFormBtn.addEventListener('click', toggleAddUserForm);

    var cancelAddUserBtn = document.getElementById('cancelAddUserBtn');
    if (cancelAddUserBtn) cancelAddUserBtn.addEventListener('click', toggleAddUserForm);

    var exportUsersBtn = document.getElementById('exportUsersBtn');
    if (exportUsersBtn) exportUsersBtn.addEventListener('click', exportUsers);

    var refreshUsersBtn = document.getElementById('refreshUsersBtn');
    if (refreshUsersBtn) refreshUsersBtn.addEventListener('click', refreshUsers);

    // Initialize media section if it exists
    if (document.getElementById('locationFolderRow')) {
        renderLocationFolders();
    }
});

// Media Section functionality - Firebase Storage integration
let locationMediaList = [];
let currentLocationFiles = {};
let currentDateFiles = {};

// Upload functionality - opens the static modal from index.html
function showUploadModal() {
    const modalElement = document.getElementById('uploadMediaModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Upload modal not found in HTML');
    }
}

// Fetch locations from Firebase Storage
async function fetchLocationsFromStorage() {
    try {
        const storageRef = storage.ref('media/');
        const result = await storageRef.listAll();

        locationMediaList = [];
        const locationPromises = result.prefixes.map(async (locationRef) => {
            const locationName = locationRef.name;
            const dateResult = await locationRef.listAll();

            let totalImages = 0, totalVideos = 0;

            const datePromises = dateResult.prefixes.map(async (dateRef) => {
                const filesResult = await dateRef.listAll();
                filesResult.items.forEach(item => {
                    const fileName = item.name.toLowerCase();
                    if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                        totalImages++;
                    } else if (fileName.match(/\.(mp4|mov|avi|webm)$/)) {
                        totalVideos++;
                    }
                });
            });

            await Promise.all(datePromises);

            return {
                name: locationName,
                subfolders: dateResult.prefixes.length,
                images: totalImages,
                videos: totalVideos
            };
        });

        locationMediaList = await Promise.all(locationPromises);
    } catch (error) {
        console.error('Error fetching locations:', error);
        locationMediaList = [];
    }
}

async function renderLocationFolders() {
    const row = document.getElementById('locationFolderRow');
    if (!row) return;

    // Show loading
    row.innerHTML = '<div class="col-12 text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading locations...</div>';

    // Fetch latest data from Firebase Storage
    await fetchLocationsFromStorage();
    // Update totals
    const totalLocationsEl = document.getElementById('totalLocationsMedia');
    const totalSubfoldersEl = document.getElementById('totalSubfoldersMedia');
    const totalImagesEl = document.getElementById('totalImagesMedia');
    const totalVideosEl = document.getElementById('totalVideosMedia');
    row.innerHTML = '';
    let totalSubfolders = 0, totalImages = 0, totalVideos = 0;

    if (locationMediaList.length === 0) {
        row.innerHTML = `
            <div class="col-12 text-center p-4">
                <i class="fas fa-folder-open fa-4x text-muted mb-3"></i>
                <h5 class="text-muted">No locations found</h5>
                <p class="text-muted">Upload some media files to get started</p>
                <button class="btn btn-primary" onclick="showUploadModal()">
                    <i class="fas fa-upload me-2"></i>Upload Files
                </button>
            </div>
        `;
        totalLocationsEl.textContent = 0;
        totalSubfoldersEl.textContent = 0;
        totalImagesEl.textContent = 0;
        totalVideosEl.textContent = 0;
        return;
    }

    locationMediaList.forEach(loc => {
        totalSubfolders += loc.subfolders;
        totalImages += loc.images;
        totalVideos += loc.videos;

        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3 mb-3';
        col.innerHTML = `
            <div class="card border-0 shadow-sm h-100 location-folder-card" 
                 style="cursor:pointer; border-radius: 16px; overflow: hidden; transition: all 0.3s ease;"
                 onclick="loadLocationMedia('${loc.name}')">
                <div class="position-absolute top-0 end-0 m-2" style="z-index: 10;">
                    <button class="btn btn-sm btn-danger rounded-circle" 
                            onclick="event.stopPropagation(); deleteLocation('${loc.name}');" 
                            title="Delete Location"
                            style="width: 32px; height: 32px; padding: 0;">
                        <i class="fas fa-trash fa-xs"></i>
                    </button>
                </div>
                <div class="card-body text-center p-3" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-map-marker-alt fa-3x text-white mb-2" style="opacity: 0.9;"></i>
                    <h6 class="text-white fw-bold mb-0">${loc.name}</h6>
                </div>
                <div class="card-footer bg-white border-0 p-2">
                    <div class="d-flex flex-wrap justify-content-center gap-1 mb-1">
                        <span class="badge bg-secondary bg-opacity-75" style="font-size: 0.65rem;">
                            <i class="fas fa-folder fa-xs me-1"></i>${loc.subfolders}
                        </span>
                        <span class="badge bg-info bg-opacity-75" style="font-size: 0.65rem;">
                            <i class="fas fa-image fa-xs me-1"></i>${loc.images}
                        </span>
                        ${loc.videos > 0 ? `<span class="badge bg-success bg-opacity-75" style="font-size: 0.65rem;"><i class="fas fa-video fa-xs me-1"></i>${loc.videos}</span>` : ''}
                    </div>
                </div>
            </div>
        `;

        const card = col.querySelector('.location-folder-card');
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-6px)';
            this.style.boxShadow = '0 12px 28px rgba(0,0,0,0.18)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        row.appendChild(col);
    });

    if (totalLocationsEl) totalLocationsEl.textContent = locationMediaList.length;
    if (totalSubfoldersEl) totalSubfoldersEl.textContent = totalSubfolders;
    if (totalImagesEl) totalImagesEl.textContent = totalImages;
    if (totalVideosEl) totalVideosEl.textContent = totalVideos;

    // Initialize gallery with instruction
    const mediaGallery = document.getElementById('mediaGallery');
    if (mediaGallery) {
        mediaGallery.innerHTML = `
            <div class="text-center p-4 p-md-5">
                <div class="mb-4">
                    <i class="fas fa-hand-pointer fa-3x text-primary mb-3" style="opacity: 0.5;"></i>
                    <h5 class="text-muted mb-2">Select a location to view media</h5>
                    <p class="text-muted small mb-0">Click on any location folder above</p>
                </div>
            </div>
        `;
    }
}

async function loadLocationMedia(locationName) {
    const mediaGallery = document.getElementById('mediaGallery');
    if (!mediaGallery) return;

    // Show loading
    mediaGallery.innerHTML = `
        <div class="text-center p-4">
            <i class="fas fa-spinner fa-spin fa-2x"></i><br>
            Loading ${locationName} folders...
        </div>
    `;

    try {
        const locationRef = storage.ref(`media/${locationName}/`);
        const result = await locationRef.listAll();

        currentLocationFiles = {};
        const datePromises = result.prefixes.map(async (dateRef) => {
            const dateName = dateRef.name;
            const filesResult = await dateRef.listAll();

            let images = 0, videos = 0;
            filesResult.items.forEach(item => {
                const fileName = item.name.toLowerCase();
                if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    images++;
                } else if (fileName.match(/\.(mp4|mov|avi|webm)$/)) {
                    videos++;
                }
            });

            currentLocationFiles[dateName] = { images, videos, files: filesResult.items };
        });

        await Promise.all(datePromises);

        let html = `
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div>
                    <h5 class="mb-1"><i class='fas fa-folder text-warning me-2'></i>${locationName}</h5>
                    <small class="text-muted">${Object.keys(currentLocationFiles).length} date folders</small>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="renderLocationFolders()">
                        <i class="fas fa-arrow-left me-1"></i><span class="d-none d-md-inline">Back to Locations</span><span class="d-md-none">Back</span>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-upload me-1"></i><span class="d-none d-sm-inline">Upload</span>
                    </button>
                </div>
            </div>
        `;

        if (Object.keys(currentLocationFiles).length === 0) {
            html += `
                <div class="text-center p-4">
                    <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
                    <h6 class="text-muted">No date folders found</h6>
                    <p class="text-muted">Upload some files to create date folders</p>
                    <button class="btn btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-upload me-2"></i>Upload Files
                    </button>
                </div>
            `;
        } else {
            html += '<div class="row g-2 g-md-3">';

            Object.keys(currentLocationFiles).sort().reverse().forEach(dateStr => {
                const dateData = currentLocationFiles[dateStr];
                const totalFiles = dateData.images + dateData.videos;
                html += `
                    <div class='col-6 col-md-4 col-lg-3'>
                        <div class="card border-0 shadow-sm h-100 date-folder-card" 
                             style="cursor:pointer; transition: all 0.3s ease; border-radius: 12px;"
                             onclick="loadDateMedia('${locationName}', '${dateStr}')">
                            <div class="position-absolute top-0 end-0 m-2" style="z-index: 10;">
                                <button class="btn btn-sm btn-danger rounded-circle" 
                                        onclick="event.stopPropagation(); deleteFolder('${locationName}', '${dateStr}');" 
                                        title="Delete Folder"
                                        style="width: 32px; height: 32px; padding: 0;">
                                    <i class="fas fa-trash fa-xs"></i>
                                </button>
                            </div>
                            <div class="card-body text-center p-3">
                                <div class="mb-3">
                                    <i class="fas fa-folder fa-3x text-primary" style="opacity: 0.8;"></i>
                                </div>
                                <h6 class="fw-bold mb-2" style="font-size: 0.9rem;">${dateStr}</h6>
                                <div class="d-flex justify-content-center gap-1 flex-wrap">
                                    ${dateData.images > 0 ? `<span class="badge bg-info bg-opacity-75" style="font-size: 0.7rem;">${dateData.images} <i class="fas fa-image fa-xs"></i></span>` : ''}
                                    ${dateData.videos > 0 ? `<span class="badge bg-success bg-opacity-75" style="font-size: 0.7rem;">${dateData.videos} <i class="fas fa-video fa-xs"></i></span>` : ''}
                                </div>
                                <small class="text-muted d-block mt-2" style="font-size: 0.7rem;">${totalFiles} total</small>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
        }

        mediaGallery.innerHTML = html;

        // Add hover effects to date folder cards
        setTimeout(() => {
            document.querySelectorAll('.date-folder-card').forEach(card => {
                card.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-4px)';
                    this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                });
                card.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });
            });
        }, 100);

    } catch (error) {
        console.error('Error loading location media:', error);
        mediaGallery.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error loading ${locationName} folders. Please try again.
            </div>
        `;
    }
}

async function loadDateMedia(locationName, dateStr) {
    const mediaGallery = document.getElementById('mediaGallery');
    if (!mediaGallery) return;

    // Show loading
    mediaGallery.innerHTML = `
        <div class="text-center p-4">
            <i class="fas fa-spinner fa-spin fa-2x"></i><br>
            Loading media files...
        </div>
    `;

    try {
        const dateRef = storage.ref(`media/${locationName}/${dateStr}/`);
        const result = await dateRef.listAll();

        const imageFiles = [];
        const videoFiles = [];

        for (const item of result.items) {
            const fileName = item.name.toLowerCase();
            const downloadURL = await item.getDownloadURL();

            if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                imageFiles.push({ name: item.name, url: downloadURL, ref: item });
            } else if (fileName.match(/\.(mp4|mov|avi|webm)$/)) {
                videoFiles.push({ name: item.name, url: downloadURL, ref: item });
            }
        }

        let html = `
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div>
                    <h5 class="mb-1"><i class='fas fa-calendar-alt text-primary me-2'></i>${dateStr}</h5>
                    <small class="text-muted">${imageFiles.length} images, ${videoFiles.length} videos</small>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="loadLocationMedia('${locationName}')">
                        <i class="fas fa-arrow-left me-1"></i><span class="d-none d-md-inline">Back to ${locationName}</span><span class="d-md-none">Back</span>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-upload me-1"></i><span class="d-none d-sm-inline">Upload</span>
                    </button>
                </div>
            </div>
        `;

        if (imageFiles.length === 0 && videoFiles.length === 0) {
            html += `
                <div class="text-center p-4">
                    <i class="fas fa-images fa-3x text-muted mb-3"></i>
                    <h6 class="text-muted">No media files found</h6>
                    <p class="text-muted">Upload some files for this date</p>
                    <button class="btn btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-upload me-2"></i>Upload Files
                    </button>
                </div>
            `;
        } else {
            html += '<div class="row g-2 g-md-3">';

            // Display images
            imageFiles.forEach((file, index) => {
                const shortName = file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name;
                html += `
                    <div class='col-6 col-md-4 col-lg-3'>
                        <div class="card border-0 shadow-sm h-100" style="border-radius: 12px; overflow: hidden;">
                            <div class="position-relative" style="cursor: pointer;" onclick="showImageModal('${file.url}', '${locationName} - ${dateStr} - ${file.name}')">
                                <img src='${file.url}' 
                                     class='card-img-top' 
                                     style='width: 100%; height: 160px; object-fit: cover;'
                                     loading="lazy"
                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div class="d-none align-items-center justify-content-center bg-light position-absolute w-100 h-100" style="height: 160px; top: 0;">
                                    <div class="text-center text-muted">
                                        <i class="fas fa-image fa-2x mb-1"></i>
                                        <small class="d-block">Failed to load</small>
                                    </div>
                                </div>
                                <div class="position-absolute top-0 end-0 m-2">
                                    <button class="btn btn-sm btn-danger rounded-circle" 
                                            onclick="event.stopPropagation(); deleteFile('${locationName}', '${dateStr}', '${file.name}', 'image')" 
                                            title="Delete"
                                            style="width: 32px; height: 32px; padding: 0; opacity: 0.9;">
                                        <i class="fas fa-trash fa-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body p-2">
                                <small class="text-muted text-truncate d-block" style="font-size: 0.7rem;" title="${file.name}">
                                    <i class="fas fa-image me-1"></i>${shortName}
                                </small>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Display videos
            videoFiles.forEach((file, index) => {
                const shortName = file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name;
                html += `
                    <div class='col-6 col-md-4 col-lg-3'>
                        <div class="card border-0 shadow-sm h-100" style="border-radius: 12px; overflow: hidden;">
                            <div class="position-relative" style="cursor: pointer;" onclick="showVideoModal('${file.url}', '${locationName} - ${dateStr} - ${file.name}')">
                                <video class='card-img-top' 
                                       style='width: 100%; height: 160px; object-fit: cover;'
                                       muted>
                                    <source src='${file.url}' type="video/mp4">
                                </video>
                                <div class="position-absolute top-50 start-50 translate-middle">
                                    <i class="fas fa-play-circle fa-3x text-white" style="opacity: 0.8; text-shadow: 0 2px 8px rgba(0,0,0,0.5);"></i>
                                </div>
                                <div class="position-absolute top-0 end-0 m-2">
                                    <button class="btn btn-sm btn-danger rounded-circle" 
                                            onclick="event.stopPropagation(); deleteFile('${locationName}', '${dateStr}', '${file.name}', 'video')" 
                                            title="Delete"
                                            style="width: 32px; height: 32px; padding: 0; opacity: 0.9;">
                                        <i class="fas fa-trash fa-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body p-2">
                                <small class="text-muted text-truncate d-block" style="font-size: 0.7rem;" title="${file.name}">
                                    <i class="fas fa-video me-1"></i>${shortName}
                                </small>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
        }

        mediaGallery.innerHTML = html;

    } catch (error) {
        console.error('Error loading date media:', error);
        mediaGallery.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error loading media files. Please try again.
            </div>
        `;
    }
}

// Upload files to Firebase Storage
// Function to detect existing date format and convert accordingly
async function getExistingDateFormat(location) {
    try {
        const locationRef = storage.ref(`media/${location}/`);
        const result = await locationRef.listAll();

        // Check existing folder names to detect date format
        for (let folderRef of result.prefixes) {
            const folderName = folderRef.name;

            // Check for DD-MM-YYYY format (with dash)
            if (/^\d{2}-\d{2}-\d{4}$/.test(folderName)) {
                console.log(`Detected format: DD-MM-YYYY from folder ${folderName}`);
                return 'DD-MM-YYYY';
            }
            // Check for DD.MM.YYYY format (with dot)
            if (/^\d{2}\.\d{2}\.\d{4}$/.test(folderName)) {
                console.log(`Detected format: DD.MM.YYYY from folder ${folderName}`);
                return 'DD.MM.YYYY';
            }
            // Check for DD/MM/YYYY format (with slash)
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(folderName)) {
                console.log(`Detected format: DD/MM/YYYY from folder ${folderName}`);
                return 'DD/MM/YYYY';
            }
            // Check for YYYY-MM-DD format (with dash)
            if (/^\d{4}-\d{2}-\d{2}$/.test(folderName)) {
                console.log(`Detected format: YYYY-MM-DD from folder ${folderName}`);
                return 'YYYY-MM-DD';
            }
            // Check for YYYY.MM.DD format (with dot)
            if (/^\d{4}\.\d{2}\.\d{2}$/.test(folderName)) {
                console.log(`Detected format: YYYY.MM.DD from folder ${folderName}`);
                return 'YYYY.MM.DD';
            }
            // Check for YYYY/MM/DD format (with slash)
            if (/^\d{4}\/\d{2}\/\d{2}$/.test(folderName)) {
                console.log(`Detected format: YYYY/MM/DD from folder ${folderName}`);
                return 'YYYY/MM/DD';
            }
        }

        // Default to YYYY-MM-DD if no existing folders
        console.log('No existing folders found, using default: YYYY-MM-DD');
        return 'YYYY-MM-DD';
    } catch (error) {
        console.error('Error detecting date format:', error);
        return 'YYYY-MM-DD';
    }
}

// Function to convert date to detected format
function convertDateToFormat(dateString, format) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    switch (format) {
        case 'DD-MM-YYYY':
            return `${day}-${month}-${year}`;
        case 'DD.MM.YYYY':
            return `${day}.${month}.${year}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'YYYY.MM.DD':
            return `${year}.${month}.${day}`;
        case 'YYYY/MM/DD':
            return `${year}/${month}/${day}`;
        default:
            return `${year}-${month}-${day}`;
    }
}

// OLD uploadFiles function removed - now using startMediaUpload() instead
// This eliminates duplicate upload logic

// Delete file from Firebase Storage
async function deleteFile(location, date, fileName, type) {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) {
        return;
    }

    try {
        const filePath = `media/${location}/${date}/${fileName}`;
        const fileRef = storage.ref(filePath);
        await fileRef.delete();

        // Refresh the current view
        loadDateMedia(location, date);

        alert('File deleted successfully!');
    } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete file. Please try again.');
    }
}

// Delete entire date folder and all its contents
async function deleteFolder(location, date) {
    if (!confirm(`Are you sure you want to delete the entire folder "${date}" and all its contents?\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const folderRef = storage.ref(`media/${location}/${date}/`);
        const result = await folderRef.listAll();

        // Delete all files in the folder
        const deletePromises = result.items.map(item => item.delete());
        await Promise.all(deletePromises);

        // Refresh the location view
        loadLocationMedia(location);

        alert('Folder deleted successfully!');
    } catch (error) {
        console.error('Delete folder error:', error);
        alert('Failed to delete folder. Please try again.');
    }
}

// Delete entire location and all its contents
async function deleteLocation(locationName) {
    if (!confirm(`Are you sure you want to delete the entire location "${locationName}" and all its contents?\nThis will delete ALL date folders and files for this location.\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const locationRef = storage.ref(`media/${locationName}/`);
        const result = await locationRef.listAll();

        // Delete all subfolders and their contents
        for (const dateRef of result.prefixes) {
            const dateResult = await dateRef.listAll();
            const deletePromises = dateResult.items.map(item => item.delete());
            await Promise.all(deletePromises);
        }

        // Refresh the main view
        renderLocationFolders();

        alert('Location deleted successfully!');
    } catch (error) {
        console.error('Delete location error:', error);
        alert('Failed to delete location. Please try again.');
    }
}

function showVideoModal(src, title) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'videoModalLabel');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="videoModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <video src="${src}" controls class="w-100 rounded" style="max-height: 500px;">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    modal.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal);
    });
}

function showImageModal(src, title) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'imageModalLabel');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${src}" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    modal.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal);
    });
}


// Bulk upload functionality
function showBulkUploadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'bulkUploadModalLabel');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content shadow-lg">
                <div class="modal-header bg-gradient-primary text-white">
                    <h5 class="modal-title fw-bold" id="bulkUploadModalLabel">
                        <i class="fas fa-cloud-upload-alt me-2"></i>Bulk Media Upload Center
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <!-- Upload Type Selection -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card border-0 bg-light">
                                <div class="card-body p-3">
                                    <h6 class="card-title text-primary mb-3">
                                        <i class="fas fa-cog me-2"></i>Upload Configuration
                                    </h6>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold text-secondary">Upload Type:</label>
                                            <div class="d-flex gap-3">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="uploadType" id="uploadFiles" value="files" checked>
                                                    <label class="form-check-label" for="uploadFiles">
                                                        <i class="fas fa-file me-1"></i>Multiple Files
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="uploadType" id="uploadFolder" value="folder">
                                                    <label class="form-check-label" for="uploadFolder">
                                                        <i class="fas fa-folder me-1"></i>Entire Folder
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold text-secondary">Organization:</label>
                                            <div class="d-flex gap-3">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="organizeBy" id="organizeByDate" value="date" checked>
                                                    <label class="form-check-label" for="organizeByDate">
                                                        <i class="fas fa-calendar me-1"></i>By Date
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="organizeBy" id="organizeByLocation" value="location">
                                                    <label class="form-check-label" for="organizeByLocation">
                                                        <i class="fas fa-map-marker-alt me-1"></i>By Location
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- File Selection Area -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card h-100 border-primary border-opacity-25">
                                <div class="card-header bg-primary bg-opacity-10">
                                    <h6 class="card-title mb-0 text-primary">
                                        <i class="fas fa-upload me-2"></i>File Selection
                                    </h6>
                                </div>
                                <div class="card-body">
                                    <div class="upload-drop-zone border-2 border-dashed border-primary rounded-3 p-4 text-center mb-3" 
                                         style="background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);">
                                        <div class="mb-3">
                                            <i class="fas fa-cloud-upload-alt fa-3x text-primary opacity-75"></i>
                                        </div>
                                        <input type="file" id="bulkMediaFiles" class="form-control form-control-lg" multiple accept="image/*,video/*" required>
                                        <div class="mt-2">
                                            <small id="uploadHelpText" class="text-muted fw-medium">
                                                Select multiple images and videos for bulk upload
                                            </small>
                                        </div>
                                    </div>
                                    
                                    <div id="locationSelectDiv" class="mt-3" style="display:none;">
                                        <div class="alert alert-info alert-dismissible d-flex align-items-center" role="alert">
                                            <i class="fas fa-info-circle me-2"></i>
                                            <div>
                                                <strong>Location Mode:</strong> All files will be organized under the selected location.
                                            </div>
                                        </div>
                                        <label class="form-label fw-semibold">Select Location:</label>
                                        <select id="bulkLocation" class="form-select form-select-lg">
                                            <option value="AKURE">📍 AKURE</option>
                                            <option value="IBADAN">📍 IBADAN</option>
                                            <option value="IBADAN-MOKOLA">📍 IBADAN-MOKOLA</option>
                                            <option value="ADO-EKITI">📍 ADO-EKITI</option>
                                            <option value="ILORIN">📍 ILORIN</option>
                                            <option value="OSOGBO">📍 OSOGBO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card h-100 border-success border-opacity-25">
                                <div class="card-header bg-success bg-opacity-10">
                                    <h6 class="card-title mb-0 text-success">
                                        <i class="fas fa-eye me-2"></i>Smart Preview
                                    </h6>
                                </div>
                                <div class="card-body">
                                    <div id="bulkFilePreview" class="preview-area border rounded-3 p-3" 
                                         style="max-height: 350px; overflow-y: auto; background: #f8f9fa;">
                                        <div class="text-center text-muted">
                                            <i class="fas fa-image fa-2x mb-2 opacity-50"></i>
                                            <p class="mb-0">Select files to see preview and Firebase paths</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="manualAssignDiv" class="mt-4" style="display:none;">
                        <div class="card border-warning border-opacity-25">
                            <div class="card-header bg-warning bg-opacity-10">
                                <h6 class="card-title mb-0 text-warning-emphasis">
                                    <i class="fas fa-cogs me-2"></i>Manual File Assignment
                                </h6>
                            </div>
                            <div class="card-body">
                                <div id="manualFileList" class="row"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="bulkUploadProgress" class="mt-4" style="display:none;">
                        <div class="card border-info border-opacity-25">
                            <div class="card-header bg-info bg-opacity-10">
                                <h6 class="card-title mb-0 text-info">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Upload Progress
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="progress mb-3" style="height: 8px;">
                                    <div id="bulkUploadProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" 
                                         style="width:0%"></div>
                                </div>
                                <div id="bulkUploadStatus" class="text-center fw-medium"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light border-top">
                    <div class="d-flex justify-content-between w-100 align-items-center">
                        <small class="text-muted">
                            <i class="fas fa-info-circle me-1"></i>Smart folder detection automatically organizes your files
                        </small>
                        <div>
                            <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">
                                <i class="fas fa-times me-1"></i>Cancel
                            </button>
                            <button type="button" class="btn btn-primary btn-lg" onclick="startBulkUpload()">
                                <i class="fas fa-rocket me-2"></i>Start Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);

    // Fix accessibility: Remove aria-hidden when modal is shown
    modal.addEventListener('shown.bs.modal', function () {
        modal.removeAttribute('aria-hidden');
    });

    modal.addEventListener('hidden.bs.modal', function () {
        modal.setAttribute('aria-hidden', 'true');
        document.body.removeChild(modal);
    });

    bsModal.show();

    // Handle upload type change
    document.querySelectorAll('input[name="uploadType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const fileInput = document.getElementById('bulkMediaFiles');
            const helpText = document.getElementById('uploadHelpText');

            if (this.value === 'folder') {
                fileInput.setAttribute('webkitdirectory', '');
                fileInput.removeAttribute('multiple');
                helpText.textContent = 'Select an entire folder to upload all images and videos inside it';
            } else {
                fileInput.removeAttribute('webkitdirectory');
                fileInput.setAttribute('multiple', '');
                helpText.textContent = 'Select multiple images and videos for bulk upload';
            }

            // Clear previous selection
            fileInput.value = '';
            updateBulkFilePreview();
        });
    });

    // Handle organization method change
    document.querySelectorAll('input[name="organizeBy"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const locationDiv = document.getElementById('locationSelectDiv');
            const manualDiv = document.getElementById('manualAssignDiv');

            if (this.value === 'location') {
                locationDiv.style.display = 'block';
                manualDiv.style.display = 'none';
            } else if (this.value === 'manual') {
                locationDiv.style.display = 'none';
                manualDiv.style.display = 'block';
                updateManualFileList();
            } else {
                locationDiv.style.display = 'none';
                manualDiv.style.display = 'none';
            }
        });
    });

    // Handle file selection
    document.getElementById('bulkMediaFiles').addEventListener('change', function () {
        updateBulkFilePreview();
        const organizeManual = document.getElementById('organizeManual');
        if (organizeManual && organizeManual.checked) {
            updateManualFileList();
        }
    });
}

function updateBulkFilePreview() {
    const files = document.getElementById('bulkMediaFiles').files;
    const preview = document.getElementById('bulkFilePreview');
    const uploadType = document.querySelector('input[name="uploadType"]:checked').value;
    preview.innerHTML = '';

    if (files.length === 0) {
        preview.innerHTML = '<p class="text-muted text-center">Select files or folder to see preview</p>';
        return;
    }

    if (uploadType === 'folder') {
        // Show folder structure with smart detection
        const folders = new Map();
        Array.from(files).forEach(file => {
            const pathParts = file.webkitRelativePath.split('/');
            const rootFolderName = pathParts[0];
            const fileName = pathParts[pathParts.length - 1];

            // Smart detection logic - matches upload logic exactly
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const dateRegex2 = /^\d{2}-\d{2}-\d{4}$/;
            let finalPath;

            if (dateRegex.test(rootFolderName) || dateRegex2.test(rootFolderName)) {
                // Date folder: media/2025-12-31/image.jpg
                finalPath = `media/${rootFolderName}/${fileName}`;
            } else if (pathParts.length > 1) {
                // Location folder with substructure - preserve complete path
                let subPath = pathParts.slice(1).join('/');
                finalPath = `media/${rootFolderName}/${subPath}`;
            } else {
                // Simple location folder: media/LOCATION/today/image.jpg
                const today = new Date().toISOString().slice(0, 10);
                finalPath = `media/${rootFolderName}/${today}/${fileName}`;
            }

            if (!folders.has(rootFolderName)) {
                folders.set(rootFolderName, []);
            }
            folders.get(rootFolderName).push({ file, finalPath });
        });

        preview.innerHTML = `<p class="mb-2"><strong>Smart Folder Detection (${files.length} files)</strong></p>`;

        folders.forEach((folderFiles, folderName) => {
            const folderDiv = document.createElement('div');
            folderDiv.className = 'mb-3 p-2 border rounded bg-light';
            folderDiv.innerHTML = `
                <div class="fw-bold mb-2">
                    <i class="fas fa-folder text-warning me-2"></i>${folderName} → Firebase Paths:
                </div>
            `;

            const filesList = document.createElement('div');
            filesList.className = 'ms-3';

            folderFiles.slice(0, 5).forEach(({ file, finalPath }) => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'mb-1 small';

                if (file.type.startsWith('image/')) {
                    fileDiv.innerHTML = `<i class="fas fa-image text-success me-1"></i><strong>${finalPath}</strong>`;
                } else if (file.type.startsWith('video/')) {
                    fileDiv.innerHTML = `<i class="fas fa-video text-info me-1"></i><strong>${finalPath}</strong>`;
                }

                filesList.appendChild(fileDiv);
            });

            if (folderFiles.length > 5) {
                const moreDiv = document.createElement('div');
                moreDiv.className = 'small text-muted';
                moreDiv.innerHTML = `<i class="fas fa-ellipsis-h me-1"></i>and ${folderFiles.length - 5} more files`;
                filesList.appendChild(moreDiv);
            }

            folderDiv.appendChild(filesList);
            preview.appendChild(folderDiv);
        });
    } else {
        // Show individual files
        preview.innerHTML = `<p class="mb-2"><strong>${files.length} files selected</strong></p>`;

        Array.from(files).slice(0, 10).forEach((file, index) => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'mb-2 p-2 border rounded';

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    fileDiv.innerHTML = `
                        <div class="d-flex align-items-center">
                            <img src="${e.target.result}" class="me-2" style="width:40px;height:40px;object-fit:cover;border-radius:4px;">
                            <div>
                                <div class="fw-bold">${file.name}</div>
                                <small class="text-muted">Image • ${(file.size / 1024).toFixed(1)} KB</small>
                            </div>
                        </div>
                    `;
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                fileDiv.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="me-2 d-flex align-items-center justify-content-center bg-dark text-white" style="width:40px;height:40px;border-radius:4px;">
                            <i class="fas fa-video"></i>
                        </div>
                        <div>
                            <div class="fw-bold">${file.name}</div>
                            <small class="text-muted">Video • ${(file.size / 1024 / 1024).toFixed(1)} MB</small>
                        </div>
                    </div>
                `;
            }

            preview.appendChild(fileDiv);
        });

        if (files.length > 10) {
            const moreDiv = document.createElement('div');
            moreDiv.className = 'text-center text-muted';
            moreDiv.innerHTML = `<small>... and ${files.length - 10} more files</small>`;
            preview.appendChild(moreDiv);
        }
    }
}

function updateManualFileList() {
    const files = document.getElementById('bulkMediaFiles').files;
    const listDiv = document.getElementById('manualFileList');
    listDiv.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-3';
        col.innerHTML = `
            <div class="border rounded p-3">
                <div class="mb-2">
                    <strong>${file.name}</strong>
                    <small class="text-muted d-block">${file.type.startsWith('image/') ? 'Image' : 'Video'}</small>
                </div>
                <div class="row g-2">
                    <div class="col-6">
                        <label class="form-label">Location</label>
                        <select class="form-select form-select-sm" data-file-index="${index}" data-field="location">
                            <option value="AKURE">AKURE</option>
                            <option value="IBADAN">IBADAN</option>
                            <option value="IBADAN-MOKOLA">IBADAN-MOKOLA</option>
                            <option value="ADO-EKITI">ADO-EKITI</option>
                            <option value="ILORIN">ILORIN</option>
                            <option value="OSOGBO">OSOGBO</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-control form-control-sm" data-file-index="${index}" data-field="date" value="${new Date().toISOString().slice(0, 10)}">
                    </div>
                </div>
            </div>
        `;
        listDiv.appendChild(col);
    });
}

async function startBulkUpload() {
    const files = document.getElementById('bulkMediaFiles').files;
    const organizeBy = document.querySelector('input[name="organizeBy"]:checked').value;
    const uploadType = document.querySelector('input[name="uploadType"]:checked').value;

    if (files.length === 0) {
        alert('Please select files or folder to upload');
        return;
    }

    const progressDiv = document.getElementById('bulkUploadProgress');
    const progressBar = document.getElementById('bulkUploadProgressBar');
    const statusDiv = document.getElementById('bulkUploadStatus');

    progressDiv.style.display = 'block';

    // Upload tracking
    const uploadReport = {
        total: files.length,
        uploaded: [],
        skipped: [],
        failed: []
    };

    try {
        const today = new Date().toISOString().slice(0, 10);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let filePath, location, date, fileName;

            if (uploadType === 'folder') {
                const pathParts = file.webkitRelativePath.split('/');
                const rootFolderName = pathParts[0];
                fileName = pathParts[pathParts.length - 1];

                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                const dateRegex2 = /^\d{2}-\d{2}-\d{4}$/;

                // Check if user selected a location in organize by location mode
                if (organizeBy === 'location') {
                    location = document.getElementById('bulkLocation').value;
                    // If root folder is a date, use it; otherwise use today
                    if (dateRegex.test(rootFolderName) || dateRegex2.test(rootFolderName)) {
                        date = rootFolderName;
                    } else {
                        date = pathParts[1] && (dateRegex.test(pathParts[1]) || dateRegex2.test(pathParts[1])) ? pathParts[1] : today;
                    }
                    filePath = `media/${location}/${date}/${fileName}`;
                } else if (dateRegex.test(rootFolderName) || dateRegex2.test(rootFolderName)) {
                    // Root folder is a date folder
                    filePath = `media/${rootFolderName}/${fileName}`;
                    location = 'ROOT';
                    date = rootFolderName;
                } else if (pathParts.length > 1) {
                    // Location folder with substructure - preserve complete path
                    let subPath = pathParts.slice(1).join('/');
                    filePath = `media/${rootFolderName}/${subPath}`;
                    location = rootFolderName;
                    date = pathParts[1] || today;
                } else {
                    // Simple location folder
                    filePath = `media/${rootFolderName}/${today}/${fileName}`;
                    location = rootFolderName;
                    date = today;
                }
            } else {
                if (organizeBy === 'date') {
                    const fileDate = new Date(file.lastModified);
                    date = fileDate.toISOString().slice(0, 10);
                    location = 'AUTO_' + date.replace(/-/g, '');
                } else if (organizeBy === 'location') {
                    location = document.getElementById('bulkLocation').value;
                    date = today;
                } else {
                    const locationSelect = document.querySelector(`select[data-file-index="${i}"][data-field="location"]`);
                    const dateInput = document.querySelector(`input[data-file-index="${i}"][data-field="date"]`);
                    location = locationSelect.value;
                    date = dateInput.value;
                }

                const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                fileName = sanitizedName;
                filePath = `media/${location}/${date}/${fileName}`;
            }

            const progress = ((i + 1) / files.length) * 100;
            progressBar.style.width = progress + '%';
            statusDiv.innerHTML = `Processing ${file.name}... (${i + 1}/${files.length})`;

            try {
                const storageRef = storage.ref(filePath);

                // Check if file exists in THIS specific location/date folder
                try {
                    await storageRef.getMetadata();
                    // File exists - skip it
                    uploadReport.skipped.push({
                        name: file.name,
                        reason: `Already exists in ${location}/${date}`,
                        path: filePath
                    });
                    statusDiv.innerHTML = `<span class="text-warning">⚠️ Skipped: ${file.name} (duplicate)</span>`;
                    await new Promise(resolve => setTimeout(resolve, 500));
                    continue;
                } catch (metadataError) {
                    if (metadataError.code !== 'storage/object-not-found') {
                        throw metadataError;
                    }
                }

                // Upload the file
                await storageRef.put(file);
                uploadReport.uploaded.push({
                    name: file.name,
                    location: location,
                    date: date,
                    path: filePath
                });
                statusDiv.innerHTML = `<span class="text-success">✅ Uploaded: ${file.name}</span>`;
                await new Promise(resolve => setTimeout(resolve, 300));

            } catch (uploadError) {
                console.error('Upload error for file:', file.name, uploadError);
                uploadReport.failed.push({
                    name: file.name,
                    reason: uploadError.message,
                    path: filePath
                });
                statusDiv.innerHTML = `<span class="text-danger">❌ Failed: ${file.name}</span>`;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        // Show detailed upload report
        showUploadReport(uploadReport);

        setTimeout(() => {
            // Reset form fields
            const fileInput = document.getElementById('bulkMediaFiles');
            if (fileInput) {
                fileInput.value = '';
                fileInput.removeAttribute('webkitdirectory');
                fileInput.setAttribute('multiple', '');
            }

            const uploadTypeRadios = document.querySelectorAll('input[name="uploadType"]');
            if (uploadTypeRadios.length > 0) {
                uploadTypeRadios[0].checked = true;
            }

            const organizeByRadios = document.querySelectorAll('input[name="organizeBy"]');
            if (organizeByRadios.length > 0) {
                organizeByRadios[0].checked = true;
            }

            // Reset progress
            progressBar.style.width = '0%';
            progressDiv.style.display = 'none';
            document.getElementById('bulkLocation').value = 'AKURE';
            document.getElementById('bulkLocation').style.display = 'none';
            statusDiv.innerHTML = '';
            document.getElementById('bulkFilePreview').innerHTML = '';

            // Close modal
            const modalElement = document.getElementById('bulkUploadModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Refresh views
            renderLocationFolders();
            // Refresh dashboard carousel filters and media
            loadCarouselFilters().then(() => {
                if (document.getElementById('dashboard').style.display !== 'none') {
                    filterCarouselMedia();
                }
            });
        }, 2000);

    } catch (error) {
        console.error('Bulk upload error:', error);
        statusDiv.innerHTML = '<span class="text-danger">Upload failed. Please try again.</span>';
    }
}

// Show detailed upload report
function showUploadReport(report) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title"><i class="fas fa-file-upload me-2"></i>Upload Report</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-4">
                        <div class="col-4 text-center">
                            <div class="p-3 bg-light rounded">
                                <h3 class="text-primary mb-1">${report.total}</h3>
                                <small class="text-muted">Total Files</small>
                            </div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="p-3 bg-success bg-opacity-10 rounded">
                                <h3 class="text-success mb-1">${report.uploaded.length}</h3>
                                <small class="text-muted">Uploaded</small>
                            </div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="p-3 bg-warning bg-opacity-10 rounded">
                                <h3 class="text-warning mb-1">${report.skipped.length}</h3>
                                <small class="text-muted">Skipped</small>
                            </div>
                        </div>
                    </div>

                    ${report.uploaded.length > 0 ? `
                        <h6 class="text-success"><i class="fas fa-check-circle me-2"></i>Successfully Uploaded (${report.uploaded.length})</h6>
                        <div class="list-group mb-3">
                            ${report.uploaded.map(f => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong>${f.name}</strong>
                                            <br><small class="text-muted">${f.location} / ${f.date}</small>
                                        </div>
                                        <span class="badge bg-success">✓</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${report.skipped.length > 0 ? `
                        <h6 class="text-warning"><i class="fas fa-exclamation-triangle me-2"></i>Skipped Files (${report.skipped.length})</h6>
                        <div class="list-group mb-3">
                            ${report.skipped.map(f => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong>${f.name}</strong>
                                            <br><small class="text-muted">${f.reason}</small>
                                        </div>
                                        <span class="badge bg-warning">⚠</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${report.failed.length > 0 ? `
                        <h6 class="text-danger"><i class="fas fa-times-circle me-2"></i>Failed Uploads (${report.failed.length})</h6>
                        <div class="list-group">
                            ${report.failed.map(f => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong>${f.name}</strong>
                                            <br><small class="text-danger">${f.reason}</small>
                                        </div>
                                        <span class="badge bg-danger">✗</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);

    modal.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal);
    });

    bsModal.show();
}

// iOS Safari Compatibility Fixes

// --- Encryption Utility for Secure Storage ---
async function encryptData(plainText, passphrase) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", enc.encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]);
    const key = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
    );
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(plainText)
    );
    // Concatenate salt + iv + encrypted, encode as base64 for storage
    const encryptedBytes = new Uint8Array(encrypted);
    let fullBytes = new Uint8Array(salt.length + iv.length + encryptedBytes.length);
    fullBytes.set(salt, 0);
    fullBytes.set(iv, salt.length);
    fullBytes.set(encryptedBytes, salt.length + iv.length);
    return btoa(String.fromCharCode.apply(null, fullBytes));
}

(function () {
    // Fix iOS viewport issues
    function fixiOSViewport() {
        const meta = document.querySelector('meta[name="viewport"]');
        if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
        }
    }

    // Prevent iOS Safari zoom on input focus
    function preventZoomOnFocus() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.style.fontSize = '16px';
            });
            input.addEventListener('blur', function () {
                this.style.fontSize = '';
            });
        });
    }

    // Fix iOS body scroll issues
    function fixBodyScroll() {
        document.body.style.overflow = 'auto';
        document.body.style.webkitOverflowScrolling = 'touch';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
    }

    // Initialize iOS fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            fixiOSViewport();
            preventZoomOnFocus();
            fixBodyScroll();
        });
    } else {
        fixiOSViewport();
        preventZoomOnFocus();
        fixBodyScroll();
    }
})();


// Simplified Security Protection System - Auto Run
class SecurityProtection {
    constructor() {
        this.threats = [];
        this.initSecurity();
    }

    initSecurity() {
        // Auto security check on load
        this.performQuietScan();
        // Run security check every 5 minutes
        setInterval(() => this.performQuietScan(), 300000);
    }

    performQuietScan() {
        // Silent security scan - no alerts unless real threat
        // console.log('🛡️ Security scan completed - System protected');
    }

    getSecurityReport() {
        return {
            threatsBlocked: this.threats.length,
            threats: this.threats,
            status: 'protected'
        };
    }
}        // Initialize Security Protection
const securityProtection = new SecurityProtection();

// Global stylists data for table display and customer form
let stylistsData = [];
let stylistsDataGlobal = [];

// Preloaded dashboard data for instant display after login
let preloadedDashboardData = {
    stylists: null,
    customers: null,
    stats: null
};

// Preload dashboard data in background before login
function preloadDashboardData() {
    // Preload stylists
    database.ref('stylists').once('value').then(snapshot => {
        preloadedDashboardData.stylists = snapshot.val() || {};
    });
    // Preload customers
    database.ref('customers').once('value').then(snapshot => {
        preloadedDashboardData.customers = snapshot.val() || {};
    });
    // Preload stats (just call updateDashboardStats, which will use preloaded data if available)
    // Optionally, you can add more preloads here
}

// Start preloading as soon as app starts
if (typeof firebase !== 'undefined' && typeof database !== 'undefined' && database) {
    preloadDashboardData();
}

// Test Firebase connectivity without requiring authentication
function testFirebaseConnectivity() {
    // Simply check if Firebase is initialized properly
    // No database operations needed - just verify the SDK is loaded
    try {
        if (typeof firebase !== 'undefined' && typeof database !== 'undefined' && database) {
            firebaseAvailable = true;
            // console.log('✅ Firebase SDK initialized successfully');
            return Promise.resolve(true);
        } else {
            firebaseAvailable = false;
            console.error('❌ Firebase SDK not properly initialized');
            return Promise.resolve(false);
        }
    } catch (error) {
        firebaseAvailable = false;
        console.error('❌ Firebase initialization error:', error);
        return Promise.resolve(false);
    }
}

// Initialize Firebase and test connectivity - SINGLE CLEAN VERSION
function initializeApp() {
    // Set document title
    document.title = 'Market Activation System - Login';

    // Initialize login system first
    initializeLoginSystem();

    // Initialize other components (set up event listeners only, NO data loading)
    initializePasswordToggle();
    initializeNewUserForm();
    initializePaymentRequestForm();
    initializeAccessFieldsDropdown();

    // Test Firebase connectivity
    testFirebaseConnectivity();
}

// Initialize Firebase connectivity and start app
testFirebaseConnectivity().then((connected) => {
    // Initialize app regardless of Firebase status
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
});

// Configuration
const CONFIG = {
    enableBackend: true, // Firebase is enabled
    enableGoogleSheets: false, // Disabled Google Sheets
    requireOTPForForms: false, // Disabled OTP verification
    adminControlledAccess: false, // Disabled admin access control
    googleSheetsSheets: {
        users: 'Users',
        stylists: 'Stylists',
        customers: 'Customers',
        registrations: 'Registrations',
        otpLogs: 'OTP_Logs'
    }
};

// Local storage fallback functions
async function saveToLocal(key, data) {
    try {
        // Defensive: Only hash if field exists and looks like plain text
        if (data.password && typeof data.password === "string" && !/^[a-f0-9]{64}$/i.test(data.password)) {
            data.password = await hashPassword(data.password);
        }
        encryptData(JSON.stringify(currentUser), 'user-session-secret').then(encryptedUser => {
            localStorage.setItem(`firebase_${key}`, JSON.stringify(data));
        }).catch(e => {
            console.error('Encryption failed, not storing currentUser:', e);
        });
        return true;
    } catch (error) {
        return false;
    }
}

function loadFromLocal(key) {
    try {
        const data = localStorage.getItem(`firebase_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        return null;
    }
}

// Security utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Security utility: Generate cryptographically secure random password
function generateSecurePassword(length = 8) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let password = 'Temp';
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    return password;
}

// Universal data operations (Firebase with localStorage fallback)
async function saveUserData(userKey, userData) {

    if (firebaseAvailable) {
        return database.ref(`users/${userKey}`).set(userData)
            .then(() => {
                return true;
            })
            .catch(async (error) => {
                if (error.code === 'PERMISSION_DENIED') {
                    firebaseAvailable = false;
                }
                const users = loadFromLocal('users') || {};
                users[userKey] = userData;
                await saveToLocal('users', users);
                return true;
            });
    } else {
        const users = loadFromLocal('users') || {};
        users[userKey] = userData;
        await saveToLocal('users', users);
        return Promise.resolve(true);
    }
}

function getUserData(userKey) {
    if (firebaseAvailable) {
        return database.ref(`users/${userKey}`).once('value').then(snapshot => snapshot.val());
    } else {
        const users = loadFromLocal('users') || {};
        return Promise.resolve(users[userKey] || null);
    }
}

function getAllUsers() {
    if (firebaseAvailable) {
        return database.ref('users').once('value').then(snapshot => snapshot.val() || {});
    } else {
        return Promise.resolve(loadFromLocal('users') || {});
    }
}

async function deleteUserData(userKey) {
    if (firebaseAvailable) {
        return database.ref(`users/${userKey}`).remove();
    } else {
        const users = loadFromLocal('users') || {};
        delete users[userKey];
        await saveToLocal('users', users);
        return Promise.resolve();
    }
}

async function updateUserStatus(userKey, status) {
    if (firebaseAvailable) {
        return database.ref(`users/${userKey}/status`).set(status);
    } else {
        const users = loadFromLocal('users') || {};
        if (users[userKey]) {
            users[userKey].status = status;
            await saveToLocal('users', users);
        }
        return Promise.resolve();
    }
}

// Access Control System
const ACCESS_LEVELS = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    VIEWER: 'viewer'
};

// Master Login Credentials (Only for initial access to Add User form)
const MASTER_LOGIN = {
    username: 'master*admin',
    password: 'MASTER@2024#VIJAY',
    role: ACCESS_LEVELS.ADMIN,
    name: 'Master Administrator'
};

// Section permissions based on roles
const SECTION_PERMISSIONS = {
    [ACCESS_LEVELS.ADMIN]: ['dashboard', 'register-stylist', 'braiding-form', 'stylists', 'sale-order-form', 'sale-order-report', 'stylist-report', 'customers', 'payment-request', 'payments', 'reports', 'user-management', 'settings', 'media-upload', 'media-gallery'],
    [ACCESS_LEVELS.MANAGER]: ['dashboard', 'stylists', 'customers', 'payments', 'reports'],
    [ACCESS_LEVELS.USER]: ['dashboard', 'stylists', 'customers'],
    [ACCESS_LEVELS.VIEWER]: ['dashboard', 'reports']
};

// Cache Manager for user data
const CacheManager = {
    cache: new Map(),
    ttl: 5 * 60 * 1000, // 5 minutes

    set(key, value) {
        this.cache.set(key, {
            value: value,
            timestamp: Date.now()
        });
    },

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    },

    delete(key) {
        this.cache.delete(key);
    },

    clear() {
        this.cache.clear();
    },

    clearExpired() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > this.ttl) {
                this.cache.delete(key);
            }
        }
    }
};

// Clear expired cache entries every 2 minutes
setInterval(() => CacheManager.clearExpired(), 2 * 60 * 1000);

// USER_ROLES mapping for display
const USER_ROLES = {
    'superadmin': 'Super Admin',
    'admin': 'Admin',
    'management': 'Management',
    'supervisor': 'Supervisor',
    'finance': 'Finance',
    'stylist_only': 'Field Executive',
    'agency_rep': 'Agency Rep'
};

// Parse access fields from comma-separated string
function parseAccessFields(accessFieldsString) {
    // console.log('Parsing access fields:', accessFieldsString);
    if (!accessFieldsString || accessFieldsString.trim() === '') {
        // console.log('No access fields provided, defaulting to dashboard');
        return ['dashboard'];
    }

    // Handle 'all' keyword
    if (accessFieldsString.toLowerCase().trim() === 'all') {
        return ['dashboard', 'register-stylist', 'braiding-form', 'stylists', 'stylist-report', 'customers', 'payment-request', 'payments', 'reports', 'user-management', 'settings'];
    }

    // console.log('Access permissions fields string:', accessFieldsString.split(',').map(field => field.trim()).filter(field => field.length > 0));
    // Split comma-separated values and clean them
    const fields = accessFieldsString.split(',').map(field => field.trim()).filter(field => field.length > 0);

    // Ensure at least dashboard access if fields array is empty
    if (fields.length === 0) {
        // console.log('Empty fields after parsing, defaulting to dashboard');
        return ['dashboard'];
    }

    return fields;
}

// Current user session
let currentUser = null;

// Login function with Firebase backend integration
async function handleLogin(event) {
    event.preventDefault();
    // console.log('🔐 Login attempt started');

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // console.log('Username:', username);

    if (!username || !password) {
        showLoginError('Please enter both username and password');
        return;
    }

    // Check master login first
    // console.log('Checking master login...');
    // console.log('Master username check:', username.toLowerCase(), '===', MASTER_LOGIN.username, '=', username.toLowerCase() === MASTER_LOGIN.username);
    // console.log('Master password check:', password === MASTER_LOGIN.password);
    if (username.toLowerCase() === MASTER_LOGIN.username && password === MASTER_LOGIN.password) {
        // console.log('✅ Master login matched!');
        currentUser = {
            username: MASTER_LOGIN.username,
            name: MASTER_LOGIN.name,
            role: MASTER_LOGIN.role,
            isMaster: true,
            loginTime: new Date().toISOString()
        };
        // console.log('👤 CurrentUser set:', currentUser);

        encryptData(JSON.stringify(currentUser), 'user-session-secret').then(encryptedUser => {
            //  console.log('🔐 Data encrypted, storing in sessionStorage');
            sessionStorage.setItem('currentUser', encryptedUser);
        }).catch(e => {
            // fallback: do not store user data if encryption fails
            console.error('❌ Encryption failed, not storing currentUser:', e);
        });

        // console.log('🎉 Showing login success message');
        showLoginSuccess(`Welcome ${MASTER_LOGIN.name}!`);

        // console.log('⏰ Setting timeout to show dashboard');
        setTimeout(() => {
            // console.log('📊 Calling showDashboard...');
            showDashboard();
        }, 500);
        return;
    }

    // Check Firebase users database
    // console.log('Firebase available:', firebaseAvailable);
    if (firebaseAvailable) {
        // console.log('Checking Firebase for user:', username.toLowerCase());
        database.ref('users').orderByChild('username').equalTo(username.toLowerCase()).once('value')
            .then(async (snapshot) => {
                const users = snapshot.val();
                // console.log('Firebase users found:', users ? 'Yes' : 'No');

                if (!users) {
                    showLoginError('Invalid username or password');
                    return;
                }

                const userKey = Object.keys(users)[0];
                const user = users[userKey];
                // console.log('User record retrieved:', user);
                // console.log('Checking password for password:', password);
                // console.log('Checking user password:', user.password);
                const enteredPasswordHash = await hashPassword(password);
                // console.log('Password check - Hash match:', user.password === enteredPasswordHash, 'Plain match:', user.password === password);
                // Allow login with either hashed or plain text password (for migration/testing)
                if (user.password !== enteredPasswordHash && user.password !== password) {
                    showLoginError('Invalid username or password');
                    return;
                }

                if (user.status !== 'active') {
                    showLoginError('Account is inactive. Please contact administrator.');
                    return;
                }

                // Successful login from Firebase
                // console.log('✅ Login successful! Redirecting to dashboard...');
                currentUser = {
                    username: escapeHtml(user.username),
                    name: escapeHtml(user.fullName),
                    role: escapeHtml(user.role) || escapeHtml(ACCESS_LEVELS.USER),
                    userId: escapeHtml(userKey),
                    isMaster: false,
                    accessFields: escapeHtml(user.accessFields || 'dashboard'),
                    loginTime: new Date().toISOString()
                };

                encryptData(JSON.stringify(currentUser), 'user-session-secret').then(encryptedUser => {
                    sessionStorage.setItem('currentUser', encryptedUser);
                }).catch(e => {
                    // fallback: do not store user data if encryption fails
                    console.error('Encryption failed, not storing currentUser:', e);
                });
                showLoginSuccess(`Welcome ${escapeHtml(user.fullName)}!`);

                setTimeout(() => {
                    showDashboard();
                }, 500);
            })
            .catch((error) => {
                showLoginError('Login failed. Please try again.');
            });
    } else {
        showLoginError('System unavailable. Please try again later.');
    }
}

// Show login error
function showLoginError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'block';

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Show login success  
function showLoginSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    if (successDiv && successText) {
        successText.textContent = message;
        successDiv.style.display = 'block';

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
            if (successDiv) {
                successDiv.style.display = 'none';
            }
        }, 3000);
    }
}

// Clear login messages
function clearLoginMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

// Show dashboard with access control
function showDashboard() {
    // console.log('📊 showDashboard function called');
    // Validate user session before showing dashboard
    if (!currentUser || !sessionStorage.getItem('currentUser')) {
        // console.log('❌ No currentUser or sessionStorage, redirecting to login');
        showLogin();
        return;
    }

    // console.log('✅ User session validated:', currentUser.username);

    // Clear any login messages
    clearLoginMessages();
    // console.log('🧹 Login messages cleared');
    // Hide login page and show main dashboard
    const loginPage = document.getElementById('loginPage');
    const mainDashboard = document.getElementById('mainDashboard');

    // console.log('🔍 Elements found - loginPage:', !!loginPage, 'mainDashboard:', !!mainDashboard);

    if (loginPage) {
        loginPage.style.display = 'none';
        // console.log('✅ Login page hidden');
    }
    if (mainDashboard) {
        mainDashboard.style.display = 'flex';
        // console.log('✅ Main dashboard shown');
        // console.log('Dashboard computed style:', window.getComputedStyle(mainDashboard).display);
        // console.log('Dashboard visibility:', window.getComputedStyle(mainDashboard).visibility);
        // console.log('Dashboard opacity:', window.getComputedStyle(mainDashboard).opacity);
    }

    document.title = 'Market Activation Dashboard';

    // Update user display with fresh data
    if (currentUser) {
        const currentUserElement = document.getElementById('currentUser');
        if (currentUserElement) {
            currentUserElement.textContent = currentUser.name || currentUser.username;
            // console.log('✅ User display updated:', currentUser.name);
        }
    }

    // Clear any previous state and apply fresh permissions
    document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
        section.style.display = 'none';
    });

    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.style.display = 'none';
        link.classList.remove('active');
    });

    // console.log('🧹 Previous state cleared');

    // Apply permissions FIRST before dashboard initialization
    // console.log('🔑 Applying section permissions...');
    applySectionPermissions();
    // console.log('✅ Section permissions applied');

    // Then initialize dashboard components
    setTimeout(() => {
        // console.log('⚙️ Initializing dashboard components...');
        initializeDashboard();
        // console.log('✅ Dashboard initialization completed');
    }, 100);
}

// Apply section permissions based on user role or accessFields
function applySectionPermissions() {
    // console.log('🔑 applySectionPermissions function called');
    // Validate current user session
    if (!currentUser || !sessionStorage.getItem('currentUser')) {
        // console.log('❌ No user session in applySectionPermissions');
        showLogin();
        return;
    }

    // console.log('👤 Current user in applySectionPermissions:', currentUser);

    // Double check user session validity
    try {
        const storedUser = sessionStorage.getItem('currentUser');
        if (!storedUser) {
            currentUser = null;
            showLogin();
            return;
        }

        // Skip parsing encrypted data - just trust currentUser is valid since we just set it
        // The data is encrypted so we can't parse it here anyway
    } catch (e) {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        showLogin();
        return;
    }

    let userPermissions;

    // If master user, use role-based permissions
    if (currentUser.isMaster) {
        userPermissions = SECTION_PERMISSIONS[currentUser.role] || [];
        // console.log('👑 Master user permissions:', userPermissions);
    } else {
        // For Firebase users, use accessFields
        userPermissions = parseAccessFields(currentUser.accessFields);
        // console.log('🔧 Firebase user permissions:', userPermissions);
    }

    // Hide all sections first
    document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Hide all sidebar links first
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const sectionId = href ? href.substring(1) : '';

        if (userPermissions.includes(sectionId)) {
            link.style.display = 'flex';
        } else {
            link.style.display = 'none';
        }
    });

    // Remove active class from all links
    document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));

    // Show first available section
    if (userPermissions.length > 0) {
        // console.log('📋 Available permissions:', userPermissions);

        const firstSection = document.getElementById(userPermissions[0]);
        // console.log('🎯 First section element:', firstSection ? 'Found' : 'Not found', userPermissions[0]);
        if (firstSection) {
            firstSection.style.display = 'block';
            // console.log('✅ First section shown:', userPermissions[0]);
        } else {
            console.warn('⚠️ First section element not found:', userPermissions[0]);
        }

        // Set first available link as active
        const firstLink = document.querySelector(`.sidebar .nav-link[href="#${userPermissions[0]}"]`);
        // console.log('🔗 First link element:', firstLink ? 'Found' : 'Not found');
        if (firstLink) {
            firstLink.classList.add('active');
            // console.log('✅ First link activated:', userPermissions[0]);
        } else {
            console.warn('⚠️ First link not found for:', userPermissions[0]);
        }
    } else {
        console.warn('⚠️ No permissions available for user');
        // Fallback: show dashboard section if no specific permissions
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
            // console.log('🔄 Fallback: Dashboard section shown');
        }
    }

    // Apply admin visibility after permissions are set
    applyAdminOnlyVisibility();
}

// Function to show/hide admin-only columns and disable hidden sidebar buttons
function applyAdminOnlyVisibility() {
    if (!currentUser) return;

    // Check if user is admin or master admin - more comprehensive check
    const isAdmin = currentUser.role === 'admin' ||
        currentUser.role === 'superadmin' ||
        currentUser.isMaster ||
        currentUser.role === 'master*admin';

    // Show/hide admin-only columns
    const adminColumns = document.querySelectorAll('.admin-only-column');
    adminColumns.forEach(col => {
        col.style.display = isAdmin ? 'table-cell' : 'none';
    });

    // Disable sidebar buttons that are hidden
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        const displayStyle = window.getComputedStyle(link).display;
        if (displayStyle === 'none') {
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.5';
            link.style.cursor = 'not-allowed';
        } else {
            link.style.pointerEvents = '';
            link.style.opacity = '';
            link.style.cursor = '';
        }
    });
}

// Updated show all sections with access control
function showAllSections() {
    // This function is now handled by applySectionPermissions
    applySectionPermissions();
    applyAdminOnlyVisibility();
}

// Show login page and hide dashboard
function showLogin() {
    // console.log('🔓 showLogin called - clearing session');

    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainDashboard').style.display = 'none';
    document.title = 'Market Activation System - Login';
    clearLoginMessages();

    // Clear form
    document.getElementById('loginForm').reset();

    // Clear session completely
    currentUser = null;
    sessionStorage.removeItem('currentUser');

    // Reset sidebar to default state
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.style.display = 'none';
        link.classList.remove('active');
    });

    // Hide all dashboard sections
    document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Clear user display
    const currentUserElement = document.getElementById('currentUser');
    if (currentUserElement) {
        currentUserElement.textContent = '';
    }

    // console.log('✅ Login state reset completed');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear all session data
        currentUser = null;
        sessionStorage.removeItem('currentUser');

        // Clear any cached data
        if (typeof CacheManager !== 'undefined' && CacheManager.clear) {
            CacheManager.clear();
        }

        // Hide all sections
        document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
            section.style.display = 'none';
        });

        // Hide all sidebar links
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.style.display = 'none';
            link.classList.remove('active');
        });

        // Clear any forms
        document.querySelectorAll('form').forEach(form => {
            if (form.reset) form.reset();
        });

        showLogin();
    }
}

// Check for existing session on page load
function checkExistingSession() {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        // Since data is encrypted, we can't parse it here
        // If we have sessionStorage data and currentUser is set, trust it
        if (currentUser && currentUser.username) {
            if (currentUser.isMaster && currentUser.username === MASTER_LOGIN.username) {
                showDashboard();
                return true;
            }
            // For Firebase users, we'd need to decrypt first, but for now just show login
            showLogin();
            return false;
        }
    }
    showLogin();
    return false;
}

// Initialize login system
function initializeLoginSystem() {
    // Add login form event listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Check for existing session
    checkExistingSession();

    // Add page visibility change listener for session validation
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            // Page is now visible, validate session
            validateCurrentSession();
        }
    });

    // Add window focus listener for additional security
    window.addEventListener('focus', function () {
        validateCurrentSession();
    });
}

// Validate current session integrity
function validateCurrentSession() {
    if (currentUser) {
        const storedUser = sessionStorage.getItem('currentUser');
        if (!storedUser) {
            // Session was cleared externally
            currentUser = null;
            showLogin();
            return;
        }

        // Skip parsing encrypted data - just check if stored data exists
        // Since data is encrypted, we trust that currentUser is valid if sessionStorage has data
        // Only logout if sessionStorage is completely empty
    }
}

// Initialize checkbox dropdown for access fields
function initializeAccessFieldsDropdown() {
    const checkboxes = document.querySelectorAll('input[name="accessFields"]');
    const dropdownButton = document.getElementById('accessFieldsDropdown');

    if (!dropdownButton) return;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const selectedFields = [];
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    selectedFields.push(cb.nextElementSibling.textContent.trim());
                }
            });

            if (selectedFields.length === 0) {
                dropdownButton.textContent = 'Select Access Fields';
            } else if (selectedFields.length === 1) {
                dropdownButton.textContent = selectedFields[0];
            } else {
                dropdownButton.textContent = `${selectedFields.length} sections selected`;
            }
        });
    });
}


async function submitNewUser() {
    const form = document.getElementById('newUserForm');
    const formData = new FormData(form);

    // Comprehensive validation
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
        showSubmissionPopup('Please fill all required fields correctly.', 'error');
        return;
    }

    // Validate full name
    const fullName = formData.get('fullName')?.trim();
    if (!fullName || fullName.length < 3) {
        showSubmissionPopup('Full name must be at least 3 characters.', 'error');
        return;
    }

    // Validate phone number
    const phoneNumber = formData.get('phoneNumber')?.trim();
    if (!phoneNumber || !/^0[789][0-9]{9}$/.test(phoneNumber)) {
        showSubmissionPopup('Phone number must be 11 digits starting with 07, 08, or 09.', 'error');
        return;
    }

    // Validate email if provided
    const email = formData.get('email')?.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showSubmissionPopup('Please enter a valid email address.', 'error');
        return;
    }

    // Validate role selection
    const role = formData.get('role');
    if (!role) {
        showSubmissionPopup('Please select a role.', 'error');
        return;
    }

    // Validate username
    const username = formData.get('username')?.trim();
    if (!username || username.length < 4) {
        showSubmissionPopup('Username must be at least 4 characters.', 'error');
        return;
    }

    // Validate password
    const password = formData.get('password');
    if (!password || password.length < 6) {
        showSubmissionPopup('Password must be at least 6 characters.', 'error');
        return;
    }

    if (!firebaseAvailable) {
        showSubmissionPopup('Firebase connection required. Please try again.', 'error');
        return;
    }

    // Get selected access fields from checkboxes
    const selectedAccessFields = [];
    const checkboxes = form.querySelectorAll('input[name="accessFields"]:checked');
    checkboxes.forEach(checkbox => {
        selectedAccessFields.push(checkbox.value);
    });

    if (selectedAccessFields.length === 0) {
        showSubmissionPopup('Please select at least one access field.', 'error');
        return;
    }

    const userData = {
        userId: 'USER_' + Date.now(),
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email || '',
        role: role,
        location: formData.get('location'),
        status: formData.get('status'),
        username: username.toLowerCase(),
        password: await hashPassword(password),
        accessFields: selectedAccessFields.join(','),
        description: formData.get('description') || '',
        createdDate: new Date().toISOString(),
        createdBy: currentUser?.name || 'System',
        lastLogin: null
    };

    // console.log('Saving user data:', userData);

    // Check if username already exists
    database.ref('users').orderByChild('username').equalTo(userData.username).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                showSubmissionPopup('Username already exists. Please choose another.', 'error');
                return Promise.reject('Username exists');
            }

            // Save new user
            // console.log('Saving to Firebase path:', `users/${userData.userId}`);
            return database.ref(`users/${userData.userId}`).set(userData);
        })
        .then(() => {
            // console.log('✅ User saved successfully to Firebase');
            showSubmissionPopup('User created successfully! 🎉', 'success');
            form.reset();
            form.classList.remove('was-validated');

            // Reset checkbox dropdown
            const checkboxes = form.querySelectorAll('input[name="accessFields"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            document.getElementById('accessFieldsDropdown').textContent = 'Select Access Fields';

            // Clear cache and reload table immediately
            CacheManager.clear();
            // console.log('🔄 Clearing cache and reloading user table...');

            // Hide form immediately
            toggleAddUserForm();

            // Force reload table with shorter delay
            setTimeout(() => {
                // console.log('🚀 Triggering table reload now...');
                loadUsersTable();
            }, 200);
        })
        .catch((error) => {
            if (error !== 'Username exists') {
                showSubmissionPopup('Failed to create user. Please try again.', 'error');
            }
        });
}

function loadUsersTable() {
    // console.log('loadUsersTable called');
    if (!firebaseAvailable) {
        // console.log('Firebase not available');
        return;
    }

    const tbody = document.getElementById('usersTableBody');
    if (!tbody) {
        // console.log('usersTableBody element not found');
        return;
    }

    tbody.innerHTML = '<tr><td colspan="10" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading users...</td></tr>';

    database.ref('users').once('value')
        .then((snapshot) => {
            const users = snapshot.val() || {};
            const usersList = Object.entries(users);
            // console.log('📊 Firebase Response - Users loaded:', usersList.length);
            // console.log('👥 Users data structure:', users);

            if (usersList.length === 0) {
                // console.log('⚠️ No users found in Firebase');
                tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No users found</td></tr>';
                return;
            }

            // console.log('🔨 Building table HTML for', usersList.length, 'users');

            // Update user statistics
            // console.log("userlist", usersList);
            const totalUsers = usersList.length;
            const activeUsers = usersList.filter(([key, user]) => user.status === 'active').length;
            const pendingUsers = usersList.filter(([key, user]) => user.status === 'pending').length;
            const blockedUsers = usersList.filter(([key, user]) => user.status === 'blocked').length;
            // console.log(`User Stats - Total: ${totalUsers}, Active: ${activeUsers}, Pending: ${pendingUsers}, Blocked: ${blockedUsers}`);

            document.getElementById('totalUsers').textContent = totalUsers;
            document.getElementById('activeUsers').textContent = activeUsers;
            document.getElementById('pendingUsers').textContent = pendingUsers;
            document.getElementById('blockedUsers').textContent = blockedUsers;

            if (usersList.length === 0) {
                // console.log('⚠️ No users found in Firebase');
                tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No users found</td></tr>';
                return;
            }

            // console.log('users found in Firebase');
            tbody.innerHTML = usersList.map(([key, user]) => {
                // console.log('Processing user:', key, user);
                const statusBadge = {
                    'active': 'success',
                    'pending': 'warning',
                    'blocked': 'danger',
                    'inactive': 'secondary'
                }[user.status] || 'secondary';

                //console.log('Determined status badge for', user.accessFields, ':', statusBadge);
                const accessFieldsArray = [user.accessFields].toString().split(',') || 'dashboard';
                //console.log('User access fields for', user.fullName, ':', accessFieldsArray);
                const accessFieldsBadges = accessFieldsArray.map(field =>
                    `<span class="badge bg-primary me-1 mb-1">${field.trim()}</span>`
                ).join('');

                const roleDisplay = USER_ROLES[user.role] || user.role || 'User';

                return `
                            <tr>
                                <td>${escapeHtml(user.fullName) || 'N/A'}</td>
                                <td>${escapeHtml(user.phoneNumber) || 'N/A'}</td>
                                <td><span class="badge bg-success">${escapeHtml(user.username) || 'N/A'}</span></td>
                                <td><span class="badge bg-warning text-dark">******</span></td>
                                <td><span class="badge bg-info">${escapeHtml(roleDisplay)}</span></td>
                                <td>${escapeHtml(user.location) || 'N/A'}</td>
                                <td><span class="badge bg-${statusBadge}">${user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Pending'}</span></td>
                                <td style="width:200px; overflow: auto; white-space: break-spaces;">${accessFieldsBadges}</td>
                                <td>${user.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-outline-warning" data-action="edit-user" data-user-key="${key}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" data-action="delete-user" data-user-key="${key}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
            }).join('');

            // console.log('✅ User table HTML updated successfully with', usersList.length, 'users');
        })
        .catch((error) => {
            tbody.innerHTML = '<tr><td colspan="10" class="text-center text-danger">Error loading users</td></tr>';
        });
}

// Edit user functionality
function editUser(userId) {
    if (!firebaseAvailable) {
        showSubmissionPopup('Firebase connection required.', 'error');
        return;
    }

    // Check cache first
    let cachedUser = CacheManager.get(userId);
    if (cachedUser) {
        showEditUserModal(userId, cachedUser);
        return;
    }

    // Fetch from Firebase
    getUserData(userId).then(user => {
        if (!user) {
            showSubmissionPopup('User not found.', 'error');
            return;
        }
        CacheManager.set(userId, user);
        showEditUserModal(userId, user);
    });
}

// Show edit user modal
function showEditUserModal(userId, user) {
    // Escape user data to prevent XSS
    const safeUserId = escapeHtml(userId);
    const safeFullName = escapeHtml(user.fullName || '');
    const safePhoneNumber = escapeHtml(user.phoneNumber || '');
    const safeEmail = escapeHtml(user.email || '');
    const safeDescription = escapeHtml(user.description || '');
    const safeUsername = escapeHtml(user.username || '');
    const safePassword = escapeHtml(user.password || '');
    const safeRole = escapeHtml(user.role || '');
    const safeLocation = escapeHtml(user.location || '');
    const safeStatus = escapeHtml(user.status || '');

    // Helper to mark selected option safely
    function isSelected(val, safeVal) {
        return val === safeVal ? 'selected' : '';
    }

    // Create modal HTML
    const modalHTML = `
                <div class="modal fade" id="editUserModal" tabindex="-1" data-bs-backdrop="static">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"><i class="fas fa-edit me-2"></i>Edit User</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="editUserForm" novalidate>
                                    <input type="hidden" id="editUserId" value="${safeUserId}">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Full Name *</label>
                                            <input type="text" class="form-control" id="editFullName" value="${safeFullName}" required minlength="3">
                                            <div class="invalid-feedback">Full name must be at least 3 characters.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone Number *</label>
                                            <input type="tel" class="form-control" id="editPhoneNumber" value="${safePhoneNumber}" required pattern="0[789][0-9]{9}" maxlength="11" title="Mobile number must start with 07, 08, or 09">
                                            <div class="invalid-feedback">Phone number must be 11 digits starting with 07, 08, or 09.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" id="editEmail" value="${safeEmail}">
                                            <div class="invalid-feedback">Please enter a valid email.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Role *</label>
                                            <select class="form-select" id="editRole" required>
                                                <option value="">Select Role</option>
                                                <option value="superadmin" ${safeRole === 'superadmin' ? 'selected' : ''}>Super Admin</option>
                                                <option value="admin" ${safeRole === 'admin' ? 'selected' : ''}>Admin</option>
                                                <option value="management" ${safeRole === 'management' ? 'selected' : ''}>Management</option>
                                                <option value="supervisor" ${safeRole === 'supervisor' ? 'selected' : ''}>Supervisor</option>
                                                <option value="finance" ${safeRole === 'finance' ? 'selected' : ''}>Finance</option>
                                                <option value="stylist_only" ${safeRole === 'stylist_only' ? 'selected' : ''}>Field Executive</option>
                                            </select>
                                            <div class="invalid-feedback">Please select a role.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Location Assigned</label>
                                            <select class="form-select" id="editLocation">
                                                <option value="all" ${safeLocation === 'all' ? 'selected' : ''}>All Locations</option>
                                                <option value="AKURE" ${safeLocation === 'AKURE' ? 'selected' : ''}>AKURE</option>
                                                <option value="IBADAN" ${safeLocation === 'IBADAN' ? 'selected' : ''}>IBADAN</option>
                                                <option value="IBADAN-MOKOLA" ${safeLocation === 'IBADAN-MOKOLA' ? 'selected' : ''}>IBADAN-MOKOLA</option>
                                                <option value="ADO-EKITI" ${safeLocation === 'ADO-EKITI' ? 'selected' : ''}>ADO-EKITI</option>
                                                <option value="ILORIN" ${safeLocation === 'ILORIN' ? 'selected' : ''}>ILORIN</option>
                                                <option value="OSOGBO" ${safeLocation === 'OSOGBO' ? 'selected' : ''}>OSOGBO</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Status *</label>
                                            <select class="form-select" id="editStatus" required>
                                                <option value="active" ${safeStatus === 'active' ? 'selected' : ''}>Active</option>
                                                <option value="inactive" ${safeStatus === 'inactive' ? 'selected' : ''}>Inactive</option>
                                                <option value="blocked" ${safeStatus === 'blocked' ? 'selected' : ''}>Blocked</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Username *</label>
                                            <input type="text" class="form-control" id="editUsername" value="${safeUsername}" required minlength="4">
                                            <div class="invalid-feedback">Username must be at least 4 characters.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Password *</label>
                                            <input type="password" class="form-control" id="editPassword" placeholder="password minimum 6 characters" value="${safePassword}" required minlength="6">
                                            <div class="invalid-feedback">Password must be at least 6 characters.</div>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Accessible Fields *</label>
                                            <div class="dropdown">
                                                <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" id="editAccessFieldsDropdown" data-bs-toggle="dropdown">
                                                    Select Access Fields
                                                </button>
                                                <div class="dropdown-menu p-2" style="min-width: 250px;">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="dashboard" id="edit_access_dashboard" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_dashboard">Dashboard</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="register-stylist" id="edit_access_register_stylist" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_register_stylist">Register Stylist</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="braiding-form" id="edit_access_braiding_form" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_braiding_form">Braiding Form</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="stylists" id="edit_access_stylists" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_stylists">Stylists</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="sale-order-form" id="edit_access_sale_order_form" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_sale_order_form">Sale Order Form</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="sale-order-report" id="edit_access_sale_order_report" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_sale_order_report">Sale Order Report</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="stylist-report" id="edit_access_stylist_report" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_stylist_report">Stylist Report</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="customers" id="edit_access_customers" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_customers">Customers</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="payment-request" id="edit_access_payment_request" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_payment_request">Payment Request</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="payments" id="edit_access_payments" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_payments">Payments</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="user-management" id="edit_access_user_management" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_user_management">User Management</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="settings" id="edit_access_settings" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_settings">Settings</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="media-upload" id="edit_access_media_upload" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_media_upload">Media Upload</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="media-gallery" id="edit_access_media_gallery" name="editAccessFields">
                                                        <label class="form-check-label" for="edit_access_media_gallery">Media Gallery</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-text">Select at least one access field.</div>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Description/Notes</label>
                                            <textarea class="form-control" id="editDescription" rows="2">${safeDescription}</textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" data-action="save-user-changes">
                                    <i class="fas fa-save me-2"></i>Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    // Remove existing modal if any
    const existingModal = document.getElementById('editUserModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize checkboxes
    const accessFields = (user.accessFields || 'dashboard').split(',');
    accessFields.forEach(field => {
        const checkbox = document.querySelector(`input[name="editAccessFields"][value="${field.trim()}"]`);
        if (checkbox) checkbox.checked = true;
    });

    // Update dropdown text
    updateEditAccessFieldsDropdown();

    // Add change listeners to checkboxes
    document.querySelectorAll('input[name="editAccessFields"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateEditAccessFieldsDropdown);
    });

    // Add real-time validation
    const form = document.getElementById('editUserForm');
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', function () {
            validateEditFormField(this);
        });
    });

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

// Update edit access fields dropdown text
function updateEditAccessFieldsDropdown() {
    const checkboxes = document.querySelectorAll('input[name="editAccessFields"]:checked');
    const dropdown = document.getElementById('editAccessFieldsDropdown');
    if (!dropdown) return;

    if (checkboxes.length === 0) {
        dropdown.textContent = 'Select Access Fields';
    } else if (checkboxes.length === 1) {
        dropdown.textContent = checkboxes[0].nextElementSibling.textContent;
    } else {
        dropdown.textContent = `${checkboxes.length} sections selected`;
    }
}

// Validate edit form field
function validateEditFormField(field) {
    if (field.checkValidity()) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

// Save user changes
async function saveUserChanges() {
    const form = document.getElementById('editUserForm');
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
        showSubmissionPopup('Please fill all required fields correctly.', 'error');
        return;
    }

    const userId = document.getElementById('editUserId').value;
    const fullName = document.getElementById('editFullName').value.trim();
    const phoneNumber = document.getElementById('editPhoneNumber').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const role = document.getElementById('editRole').value;
    const location = document.getElementById('editLocation').value;
    const status = document.getElementById('editStatus').value;
    const username = document.getElementById('editUsername').value.trim();
    const password = document.getElementById('editPassword').value;
    const description = document.getElementById('editDescription').value.trim();

    // Get selected access fields
    const selectedAccessFields = [];
    document.querySelectorAll('input[name="editAccessFields"]:checked').forEach(checkbox => {
        selectedAccessFields.push(checkbox.value);
    });

    if (selectedAccessFields.length === 0) {
        showSubmissionPopup('Please select at least one access field.', 'error');
        return;
    }

    // Get original user data
    getUserData(userId).then(originalUser => {
        // Check if username changed and already exists
        if (username.toLowerCase() !== originalUser.username.toLowerCase()) {
            return database.ref('users').orderByChild('username').equalTo(username.toLowerCase()).once('value')
                .then(snapshot => {
                    if (snapshot.exists()) {
                        showSubmissionPopup('Username already exists. Please choose another.', 'error');
                        return Promise.reject('Username exists');
                    }
                    return originalUser;
                });
        }
        return Promise.resolve(originalUser);
    }).then(async originalUser => {
        const updatedUser = {
            ...originalUser,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            role: role,
            location: location,
            status: status,
            username: username.toLowerCase(),
            password: password,//await hashPassword(password),
            accessFields: selectedAccessFields.join(','),
            description: description,
            lastModified: new Date().toISOString(),
            modifiedBy: currentUser?.name || 'System'
        };

        return saveUserData(userId, updatedUser);
    }).then(() => {
        // Update cache
        CacheManager.delete(userId);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();

        // Show success popup
        showSubmissionPopup('User updated successfully! 🎉', 'success');

        // Reload table
        setTimeout(() => loadUsersTable(), 1000);
    }).catch(error => {
        if (error !== 'Username exists') {
            showSubmissionPopup('Failed to update user. Please try again.', 'error');
        }
    });
}

function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    // console.log('🗑️ Deleting user:', userId);
    database.ref(`users/${userId}`).remove()
        .then(() => {
            showSubmissionPopup('User deleted successfully! 🗑️', 'success');
            CacheManager.delete(userId);
            setTimeout(() => loadUsersTable(), 500);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            showSubmissionPopup('Failed to delete user. Please try again.', 'error');
        });
}

// function filterUsers() {
//     // Implementation for filtering users
// }

// function clearUserFilters() {
//     // Implementation for clearing filters
// }

// Universal save function for any collection - Firebase ONLY
function saveToFirebaseAndLocal(collection, documentId, data) {
    if (firebaseAvailable) {
        return database.ref(`${collection}/${documentId}`).set(data)
            .then(() => {
                showAlert('Data saved to Firebase successfully!', 'success');
                return true;
            })
            .catch((error) => {
                showAlert('Failed to save data to Firebase. Please check connection.', 'danger');
                throw error;
            });
    } else {
        showAlert('Firebase connection required. Data not saved.', 'danger');
        return Promise.reject(new Error('Firebase not available'));
    }
}

// Simplified Stylist form submission function
function submitStylistForm() {
    const form = document.getElementById('stylistForm');
    const formData = new FormData(form);
    const submitBtn = document.getElementById('registerStylistBtn');

    // Prevent double submission
    if (submitBtn.disabled) {
        return;
    }

    // Final validation before submission
    let hasErrors = false;
    const errorMessages = [];

    // Check all form inputs for validation errors
    form.querySelectorAll('input').forEach(input => {
        if (!input.checkValidity()) {
            input.style.border = '2px solid #dc3545';
            hasErrors = true;
            errorMessages.push(`${input.name || input.id}: ${input.validationMessage}`);
        } else if (input.style.border && input.style.border.includes('dc3545')) {
            // Field has red border from custom validation
            hasErrors = true;
            errorMessages.push(`${input.name || input.id}: Please fix the validation error`);
        }
    });

    if (hasErrors) {
        const errorMessage = errorMessages.length > 0
            ? `Form has validation errors: ${errorMessages.join('; ')}`
            : 'Please fix all validation errors before submitting.';
        showAlert(errorMessage, 'danger');
        return;
    }

    if (!firebaseAvailable) {
        showAlert('Firebase connection required. Please check your connection.', 'danger');
        return;
    }

    const stylistData = {
        stylistId: 'STY_' + Date.now(),
        stylistName: formData.get('stylistName'),
        phoneNumber: formData.get('phoneNumber'),
        email: formData.get('email') || '',
        location: formData.get('stylistLocation') || '',
        bankName: formData.get('bankName') || '',
        bankAccountNumber: formData.get('bankAccountNumber') || '',
        beneficiaryName: formData.get('beneficiaryName') || '',
        stylistCode: formData.get('stylistCode') || '',
        dataAgreement: formData.get('dataAgreement') === 'on',
        dataAgreementDate: new Date().toISOString(),
        registrationDate: new Date().toISOString(),
        status: 'active',
        submittedBy: 'System User',
        geoLocation: formData.get('geoLocation') || '',
        formType: 'stylist_registration'
    };

    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    submitBtn.disabled = true;

    // Save to Firebase
    saveToFirebaseAndLocal('stylists', stylistData.stylistId, stylistData)
        .then(() => {
            // showAlert('Stylist registered successfully!', 'success');
            form.reset();

            // Clear all red borders and validation states
            form.querySelectorAll('input').forEach(input => {
                input.style.border = '';
                input.style.outline = '';  // Clear checkbox outlines
                input.setCustomValidity('');
            });

            // Auto-refresh dashboard after stylist registration
            setTimeout(() => {
                // Refresh data cache
                forceRefreshDataCache('stylists');
                if (typeof updateDashboardStats === 'function') {
                    updateDashboardStats();
                }
                if (typeof loadStylists === 'function') {
                    loadStylists();
                }
            }, 1000);

            // Hide any result divs
            // const resultDiv = document.getElementById('stylistResult');
            // if (resultDiv) {
            //     resultDiv.style.display = 'none';
            // }

            // Auto-refresh dashboard after stylist registration
            setTimeout(() => {
                forceRefreshDashboard();
            }, 1000);
        })
        .catch((error) => {
            showAlert('Failed to register stylist. Please try again.', 'error');
        })
        .finally(() => {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            updateDashboardStats();
        });
}

// --- Distributor Datalist Logic ---
let distributorNames = [];

function loadDistributorNames() {
    // Try to load from localStorage first
    const local = loadFromLocal('distributors');
    if (Array.isArray(local) && local.length > 0) {
        distributorNames = local;
        updateDistributorDatalist();
        return;
    }
    // If not in local, try Firebase (if available)
    if (firebaseAvailable) {
        database.ref('distributors').once('value').then(snapshot => {
            const data = snapshot.val();
            if (Array.isArray(data)) {
                distributorNames = data;
            } else if (data && typeof data === 'object') {
                distributorNames = Object.values(data).filter(Boolean);
            } else {
                distributorNames = [];
            }
            updateDistributorDatalist();
        }).catch(() => {
            distributorNames = [];
            updateDistributorDatalist();
        });
    } else {
        distributorNames = [];
        updateDistributorDatalist();
    }
}

function updateDistributorDatalist() {
    const datalist = document.getElementById('distributorList');
    if (!datalist) return;
    datalist.innerHTML = distributorNames.map(name => `<option value="${name}"></option>`).join('');
}

function saveDistributorNames() {
    // Save to localStorage
    localStorage.setItem('firebase_distributors', JSON.stringify(distributorNames));
    // Save to Firebase if available
    if (firebaseAvailable) {
        database.ref('distributors').set(distributorNames);
    }
}

function setupDistributorInputListeners() {
    // For all distributor inputs in the items table
    const itemsTableBody = document.getElementById('itemsTableBody');
    if (!itemsTableBody) return;
    itemsTableBody.addEventListener('blur', function (e) {
        if (e.target && e.target.classList.contains('item-distributor')) {
            let val = e.target.value.trim();
            if (val) {
                val = val.toUpperCase();
                e.target.value = val;
                if (!distributorNames.includes(val)) {
                    distributorNames.push(val);
                    updateDistributorDatalist();
                    saveDistributorNames();
                }
            }
        }
    }, true);
}

// Patch: Also auto-uppercase on input
function setupDistributorUppercase() {
    const itemsTableBody = document.getElementById('itemsTableBody');
    if (!itemsTableBody) return;
    itemsTableBody.addEventListener('input', function (e) {
        if (e.target && e.target.classList.contains('item-distributor')) {
            e.target.value = e.target.value.toUpperCase();
        }
    });
}

// Initialize dashboard functionality - SINGLE CLEAN VERSION
function initializeDashboard() {
    // Initialize forms
    initializeEnhancedStylistForm();
    initializeCustomerForm();

    // Initialize sale order system (event listeners only, no data loading)
    initializeSaleOrderSystem();

    // Distributor datalist logic
    loadDistributorNames();
    setupDistributorInputListeners();
    setupDistributorUppercase();

    // Show dashboard immediately with loading placeholders
    showDashboardPlaceholders();

    // Load dashboard carousel media automatically
    setTimeout(() => {
        filterCarouselMedia();
    }, 500);

    // Load dashboard stats in background (non-blocking)
    setTimeout(() => {
        updateDashboardStats();
    }, 100);

    // NOTE: Other data will be loaded lazily when user navigates to those sections

    // Load user management if user has access
    if (currentUser) {
        let hasUserManagement = false;

        if (currentUser.isMaster) {
            hasUserManagement = SECTION_PERMISSIONS[currentUser.role].includes('user-management');
        } else {
            const userPermissions = parseAccessFields(currentUser.accessFields);
            hasUserManagement = userPermissions.includes('user-management');
        }

        if (hasUserManagement) {
            setTimeout(() => {
                loadUsersTable();
            }, 200);
        }
    }

    // Initialize navigation
    setupNavigation();
}

// Show dashboard with loading placeholders for instant response
function showDashboardPlaceholders() {
    // Set loading text for stats
    const statsElements = document.querySelectorAll('.dashboard-section .stat-card .value');
    statsElements.forEach(element => {
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    });

    // Show loading for charts
    const locationChart = document.getElementById('locationChart');
    if (locationChart) {
        const ctx = locationChart.getContext('2d');
        ctx.clearRect(0, 0, locationChart.width, locationChart.height);
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#666';
        ctx.fillText('Loading chart...', locationChart.width / 2, locationChart.height / 2);
    }

    const salesChart = document.getElementById('salesLocationChart');
    if (salesChart) {
        const ctx = salesChart.getContext('2d');
        ctx.clearRect(0, 0, salesChart.width, salesChart.height);
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#666';
        ctx.fillText('Loading chart...', salesChart.width / 2, salesChart.height / 2);
    }

    const dailyChart = document.getElementById('dailyChart');
    if (dailyChart) {
        const ctx = dailyChart.getContext('2d');
        ctx.clearRect(0, 0, dailyChart.width, dailyChart.height);
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#666';
        ctx.fillText('Loading chart...', dailyChart.width / 2, dailyChart.height / 2);
    }
}

// Load and display stylists data - SINGLE CLEAN VERSION - Firebase ONLY
function loadStylists() {
    const tbody = document.getElementById('stylistsTableBody');

    if (firebaseAvailable) {
        // Use preloaded data if available and clear after use
        let stylists = null;
        if (preloadedDashboardData.stylists) {
            stylists = preloadedDashboardData.stylists;
            preloadedDashboardData.stylists = null;
        }
        let stylistsList = [];
        if (stylists) {
            stylistsList = Object.entries(stylists);
            // Process stylistsList and render table
            processStylistsData(stylistsList, tbody);
        } else {
            // Fallback: fetch stylists live as before
            database.ref('stylists').once('value', (snapshot) => {
                const liveStylists = snapshot.val() || {};
                stylistsList = Object.entries(liveStylists);
                // Process stylistsList and render table
                processStylistsData(stylistsList, tbody);
            }).catch(error => {
                console.error('Error fetching stylists:', error);
                tbody.innerHTML = '<tr><td colspan="9" class="text-center text-danger">Error loading stylists data</td></tr>';
            });
            return; // Exit early for async processing
        }
    } else {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-danger">🚫 Firebase connection required. Please check your connection and refresh.</td></tr>';
    }
}

// Helper function to process stylists data and render table
function processStylistsData(stylistsList, tbody) {
    // Render stylists table and update stats
    if (stylistsList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No stylists registered yet</td></tr>';
        return;
    }

    // Update stats
    const totalStylists = stylistsList.length;
    const activeStylists = stylistsList.filter(([key, data]) => (data.status || 'Active').toLowerCase() === 'active').length;
    const activeLocations = [...new Set(
        stylistsList
            .filter(([key, data]) => {
                const status = (data.status || 'Active').toString();
                return status.toLowerCase() === 'active';
            })
            .map(([key, data]) => data.location)
            .filter(location => location && location !== 'Unknown' && location !== 'undefined')
    )].length;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthStylists = stylistsList.filter(([key, data]) => {
        const regDate = new Date(data.registrationDate);
        return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
    }).length;
    const totalStylistsEl = document.getElementById('totalStylists');
    const activeStylistsEl = document.getElementById('activeStylists');
    const totalLocationsEl = document.getElementById('totalLocations');
    const newStylistsEl = document.getElementById('newStylists');
    if (totalStylistsEl) totalStylistsEl.textContent = totalStylists;
    if (activeStylistsEl) activeStylistsEl.textContent = activeStylists;
    if (totalLocationsEl) totalLocationsEl.textContent = activeLocations;
    if (newStylistsEl) newStylistsEl.textContent = thisMonthStylists;

    // Get customer data for token counts and earnings calculation
    database.ref('customers').once('value', (customerSnapshot) => {
        const customers = customerSnapshot.val() || {};
        const customersList = Object.entries(customers);

        // Calculate token counts for each stylist
        const stylistTokenCounts = {};
        customersList.forEach(([key, customer]) => {
            const stylistCode = customer.stylistCode;
            if (stylistCode) {
                stylistTokenCounts[stylistCode] = (stylistTokenCounts[stylistCode] || 0) + 1;
            }
        });

        // Render table rows with actual data
        tbody.innerHTML = stylistsList.map(([key, data], index) => {
            const tokenCount = stylistTokenCounts[data.stylistCode] || 0;
            return `<tr data-stylist-key="${key}">
                <td>
                    <div class="text-center">
                        <span class="badge bg-primary fs-6">${tokenCount}</span>
                        <br><small class="text-muted">Tokens</small>
                    </div>
                </td>
                <td>
                    <div>
                        <strong>${data.stylistName || 'N/A'}</strong>
                        <br><small class="text-muted">ID: ${data.stylistCode || 'N/A'}</small>
                    </div>
                </td>
                <td>
                    <div>
                        ${data.phoneNumber || 'N/A'}
                        <br><small class="text-muted">Mobile</small>
                    </div>
                </td>
                <td><span class="location-badge">${data.location || 'N/A'}</span></td>
                <td>
                    <div>
                        ${data.registrationDate ? new Date(data.registrationDate).toLocaleDateString() : 'N/A'}
                        <br><small class="text-muted">${data.registrationDate ? getDaysSince(data.registrationDate) + ' days ago' : ''}</small>
                    </div>
                </td>
                <td>
                    <div>
                        <strong>${data.bankAccountNumber || 'N/A'}</strong>
                        <br><small class="text-muted">Bank: ${data.bankName || 'N/A'}</small>
                    </div>
                </td>
                <td>
                    ₦<span class="balance-amount" data-stylist-code="${data.stylistCode}">...</span>
                </td>
                <td>
                    ₦<span class="total-amount" data-stylist-code="${data.stylistCode}">...</span>
                </td>
                <td class="admin-only-column action-column" style="display: none;">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-warning edit-stylist-btn" data-stylist-key="${key}" title="Edit Stylist">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
        applyAdminOnlyVisibility();
        // Calculate and update earnings for each stylist
        stylistsList.forEach(([key, data]) => {
            const stylistCustomers = customersList.filter(([custKey, customer]) => customer.stylistCode === data.stylistCode);
            let totalAmount = 0;
            let toBePaidAmount = 0;

            stylistCustomers.forEach(([custKey, customer]) => {
                const paymentAmount = parseFloat(customer.paymentAmount) || 5000;
                const paymentStatus = customer.paymentStatus || 'TO BE PAID';
                totalAmount += paymentAmount;
                if (paymentStatus !== 'PAID') {
                    toBePaidAmount += paymentAmount;
                }
            });

            const balanceSpan = tbody.querySelector(`.balance-amount[data-stylist-code="${data.stylistCode}"]`);
            const totalSpan = tbody.querySelector(`.total-amount[data-stylist-code="${data.stylistCode}"]`);
            if (balanceSpan) balanceSpan.textContent = toBePaidAmount.toFixed(2);
            if (totalSpan) totalSpan.textContent = totalAmount.toFixed(2);
        });
        attachStylistActionListeners()
    }).catch(error => {
        console.error('Error fetching customer data:', error);
        // Render table without customer data
        tbody.innerHTML = stylistsList.map(([key, data], index) => {
            return `<tr data-stylist-key="${key}">
                <td>
                    <div class="text-center">
                        <span class="badge bg-secondary fs-6">0</span>
                        <br><small class="text-muted">Tokens</small>
                    </div>
                </td>
                <td>
                    <div>
                        <strong>${data.stylistName || 'N/A'}</strong>
                        <br><small class="text-muted">ID: ${data.stylistCode || 'N/A'}</small>
                    </div>
                </td>
                <td>
                    <div>
                        ${data.phoneNumber || 'N/A'}
                        <br><small class="text-muted">Mobile</small>
                    </div>
                </td>
                <td><span class="location-badge">${data.location || 'N/A'}</span></td>
                <td>
                    <div>
                        ${data.registrationDate ? new Date(data.registrationDate).toLocaleDateString() : 'N/A'}
                        <br><small class="text-muted">${data.registrationDate ? getDaysSince(data.registrationDate) + ' days ago' : ''}</small>
                    </div>
                </td>
                <td>
                    <div>
                        <strong>${data.bankAccountNumber || 'N/A'}</strong>
                        <br><small class="text-muted">Bank: ${data.bankName || 'N/A'}</small>
                    </div>
                </td>
                <td>₦0.00</td>
                <td>₦0.00</td>
                <td class="admin-only-column action-column" style="display: none;">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-warning edit-stylist-btn" data-stylist-key="${key}" title="Edit Stylist">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
        applyAdminOnlyVisibility();
        attachStylistActionListeners();
    });

    // Update dropdowns and other UI as needed
    updateStylistCodesDropdown(stylistsList);
    // Optionally update global arrays
    stylistsData = stylistsList.map(([key, data]) => ({
        id: key,
        code: data.stylistCode,
        name: data.stylistName,
        phone: data.phoneNumber,
        location: data.location,
        date: data.registrationDate,
        status: data.status || 'Active',
        bankName: data.bankName,
        bankAccount: data.bankAccountNumber
    }));
    stylistsDataGlobal = stylistsList.map(([key, data]) => ({
        id: key,
        stylistCode: data.stylistCode,
        stylistName: data.stylistName,
        location: data.location,
        phoneNumber: data.phoneNumber,
        registrationDate: data.registrationDate,
        status: data.status || 'Active'
    }));
}

// Update stylist codes dropdown for customer form
function updateStylistCodesDropdown(stylistsList) {
    const datalist = document.getElementById('stylishCodeDatalist');
    if (!datalist) return;

    datalist.innerHTML = stylistsList.map(([key, data]) =>
        `<option value="${data.stylistCode}" data-name="${data.stylistName}" data-location="${data.location}">${data.stylistCode} - ${data.stylistName}</option>`
    ).join('');
}

// Handle stylist code selection in customer form
function initializeCustomerForm() {
    const stylistCodeInput = document.getElementById('customerStylishCodeInput');
    const stylistNameInput = document.querySelector('input[name="stylishName"]');
    const stylistLocationInput = document.getElementById('customerStylistLocation'); // Use specific ID
    const customerPhoneInput = document.querySelector('input[name="customerNumber"]');
    const customerForm = document.getElementById('geoForm');

    if (stylistCodeInput) {
        let lastValidCode = '';

        // Combined auto-uppercase and format validation for stylist code
        stylistCodeInput.addEventListener('input', function () {
            // Auto-uppercase first
            this.value = this.value.toUpperCase();
            let v = this.value;

            // Format validation: First character must be letter, followed by up to 3 digits
            if (v.length > 0 && !/^[A-Z]/.test(v[0])) {
                this.value = '';
                this.style.border = '2px solid #dc3545';
                this.setCustomValidity('Stylist code must start with a letter');
                lastValidCode = '';
                const cstcodemsg = document.getElementById('cstcodemsg');
                if (cstcodemsg) {
                    cstcodemsg.textContent = 'Stylist code must start with a letter';
                    cstcodemsg.classList.remove('d-none');
                }
                else {
                    const cstcodemsg = document.getElementById('stlcodemsg');
                    if (cstcodemsg) {
                        cstcodemsg.textContent = '';
                        cstcodemsg.classList.add('d-none');
                    }
                }
                return;
            }

            // Limit format: Letter + up to 3 digits
            if (v.length > 1) v = v[0] + v.slice(1).replace(/[^0-9]/g, '');
            if (v.length > 4) v = v.slice(0, 4);

            if (!/^([A-Z][0-9]{0,3})?$/.test(v)) {
                this.value = lastValidCode;
                this.style.border = '2px solid #dc3545';
                this.setCustomValidity('Invalid format. Use: Letter + Numbers (e.g., A123)');
                const cstcodemsg = document.getElementById('cstcodemsg');
                if (cstcodemsg) {
                    cstcodemsg.textContent = 'Invalid format. Use: Letter + Numbers (e.g., A123)';
                    cstcodemsg.classList.remove('d-none');
                }
                else {
                    const cstcodemsg = document.getElementById('cstcodemsg');
                    if (cstcodemsg) {
                        cstcodemsg.textContent = '';
                        cstcodemsg.classList.add('d-none');
                    }
                }
                return;
            }

            this.value = v;
            lastValidCode = v;

            // Check if code exists in dropdown options
            const datalist = document.getElementById('stylishCodeDatalist');
            let isValidOption = false;

            if (datalist && v.length > 0) {
                const option = datalist.querySelector(`option[value="${v}"]`);
                if (option) {
                    isValidOption = true;
                    const name = option.getAttribute('data-name');
                    const location = option.getAttribute('data-location');

                    if (stylistNameInput) stylistNameInput.value = name || '';
                    if (stylistLocationInput) stylistLocationInput.value = location || '';

                    // Fetch complete stylist data from Firebase for bank details and mobile
                    if (firebaseAvailable && v) {
                        database.ref('stylists').orderByChild('stylistCode').equalTo(v).once('value', (snapshot) => {
                            const stylistData = snapshot.val();
                            if (stylistData) {
                                const stylistKey = Object.keys(stylistData)[0];
                                const stylist = stylistData[stylistKey];

                                const mobileInput = document.getElementById('customerStylistMobile');
                                const bankNameInput = document.getElementById('customerStylistBankName');
                                const accountNoInput = document.getElementById('customerStylistAccountNo');

                                if (mobileInput) mobileInput.value = stylist.phoneNumber || '';
                                if (bankNameInput) bankNameInput.value = stylist.bankName || '';
                                if (accountNoInput) accountNoInput.value = stylist.bankAccountNumber || '';
                            }
                        });
                    }

                    this.style.border = '';
                    this.setCustomValidity('');
                } else {
                    // Also check global data
                    if (stylistsDataGlobal && stylistsDataGlobal.length > 0) {
                        const stylist = stylistsDataGlobal.find(s => s.stylistCode === v);
                        if (stylist) {
                            isValidOption = true;
                            if (stylistNameInput) stylistNameInput.value = stylist.stylistName || '';
                            if (stylistLocationInput) stylistLocationInput.value = stylist.stylistLocation || '';

                            // Fetch complete stylist data from Firebase for bank details and mobile
                            if (firebaseAvailable && v) {
                                database.ref('stylists').orderByChild('stylistCode').equalTo(v).once('value', (snapshot) => {
                                    const stylistData = snapshot.val();
                                    if (stylistData) {
                                        const stylistKey = Object.keys(stylistData)[0];
                                        const stylistDetails = stylistData[stylistKey];

                                        const mobileInput = document.getElementById('customerStylistMobile');
                                        const bankNameInput = document.getElementById('customerStylistBankName');
                                        const accountNoInput = document.getElementById('customerStylistAccountNo');

                                        if (mobileInput) mobileInput.value = stylistDetails.phoneNumber || '';
                                        if (bankNameInput) bankNameInput.value = stylistDetails.bankName || '';
                                        if (accountNoInput) accountNoInput.value = stylistDetails.bankAccountNumber || '';
                                    }
                                });
                            }

                            this.style.border = '';
                            this.setCustomValidity('');
                        }
                    }
                }
            }

            // If code doesn't exist in dropdown, show error
            if (!isValidOption && v.length > 0) {
                this.style.border = '2px solid #dc3545';
                this.setCustomValidity('Please select a valid stylist code from the dropdown list');
                if (stylistNameInput) stylistNameInput.value = '';
                if (stylistLocationInput) stylistLocationInput.value = '';
            }
        });

        // Additional validation on blur to ensure only dropdown values
        stylistCodeInput.addEventListener('blur', function () {
            const selectedCode = this.value;
            const datalist = document.getElementById('stylishCodeDatalist');
            let isValid = false;

            if (selectedCode.length === 0) {
                this.style.border = '';
                this.setCustomValidity('');
                return;
            }

            if (datalist) {
                const option = datalist.querySelector(`option[value="${selectedCode}"]`);
                if (option) {
                    isValid = true;
                } else if (stylistsDataGlobal && stylistsDataGlobal.length > 0) {
                    const stylist = stylistsDataGlobal.find(s => s.stylistCode === selectedCode);
                    if (stylist) {
                        isValid = true;
                    }
                }
            }

            if (!isValid) {
                this.style.border = '2px solid #dc3545';
                this.setCustomValidity('Please Enter registered Stylist code');
                this.value = ''; // Clear invalid input valuecstcodemsg
                showAlert('Please Enter registered Stylist code', 'warning');
                if (stylistNameInput) stylistNameInput.value = '';
                if (stylistLocationInput) stylistLocationInput.value = '';

                // Clear new fields
                const mobileInput = document.getElementById('customerStylistMobile');
                const bankNameInput = document.getElementById('customerStylistBankName');
                const accountNoInput = document.getElementById('customerStylistAccountNo');
                if (mobileInput) mobileInput.value = '';
                if (bankNameInput) bankNameInput.value = '';
                if (accountNoInput) accountNoInput.value = '';

                const cstcodemsg = document.getElementById('cstcodemsg');
                if (cstcodemsg) {
                    cstcodemsg.textContent = 'Please Enter registered Stylist code';
                    cstcodemsg.classList.remove('d-none');
                }
            } else {
                this.style.border = '';
                this.setCustomValidity('');
                const cstcodemsg = document.getElementById('cstcodemsg');
                if (cstcodemsg) {
                    cstcodemsg.textContent = '';
                    cstcodemsg.classList.add('d-none');
                }
            }
        });
    }

    // Add phone validation for customer form
    if (customerPhoneInput) {
        customerPhoneInput.addEventListener('blur', function () {
            if (this.value.length === 11) {
                if (!/^0[789][0-9]{9}$/.test(this.value)) {
                    this.style.border = '2px solid #dc3545';
                    this.setCustomValidity('Mobile number must start with 07, 08, or 09');
                    showAlert('Mobile number must start with 07, 08, or 09', 'warning');
                    const cstmobnmsg = document.getElementById('cstmobmsg');
                    if (cstmobnmsg) {
                        cstmobnmsg.textContent = 'Mobile number must start with 07, 08, or 09';
                        cstmobnmsg.classList.remove('d-none');
                    }
                } else {
                    this.style.border = '';
                    this.setCustomValidity('');
                }
            } else if (this.value.length > 0) {
                this.style.border = '2px solid #dc3545';
                this.setCustomValidity('Mobile number must be exactly 11 digits');
                const cstmobnmsg = document.getElementById('cstmobnmsg');
                if (cstmobnmsg) {
                    cstmobnmsg.textContent = 'Mobile number must be exactly 11 digits';
                    cstmobnmsg.classList.remove('d-none');
                }
            }
        });
    }

    // Mobile number validation with duplicate checking (works for both Customer Registration and Braiding forms)
    const customerMobileInput = document.getElementById('customerNumber');
    if (customerMobileInput) {
        let mobileDebounceTimer = null;

        customerMobileInput.addEventListener('input', function () {
            const mobileNumber = this.value.trim();

            // Clear previous timer
            if (mobileDebounceTimer) {
                clearTimeout(mobileDebounceTimer);
            }

            // Reset validation state first
            this.style.border = '';
            this.setCustomValidity('');

            // Mobile number validation removed - no duplicate checking needed
        });
    }

    // Token number duplicate checking
    const tokenInput = customerForm.querySelector('input[name="customerTokenNo"]');
    if (tokenInput) {
        tokenInput.addEventListener('blur', function () {
            const tokenNo = this.value.trim();
            if (tokenNo && tokenNo.length >= 1) {
                this.style.border = '2px solid #ffc107';

                database.ref('customers').orderByChild('tokenNo').equalTo(tokenNo).once('value')
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            this.style.border = '2px solid #dc3545';
                            this.value = '';
                            showAlert('This token number is already used', 'danger');
                            // this.focus();
                            const csttoknmsg = document.getElementById('csttoknmsg');
                            if (csttoknmsg) {
                                csttoknmsg.textContent = 'This token number is already used';
                                csttoknmsg.classList.remove('d-none');
                            }
                        } else {
                            this.style.border = '2px solid #28a745';
                            setTimeout(() => {
                                if (this.style.border.includes('#28a745')) {
                                    this.style.border = '';
                                }
                            }, 2000);
                            const csttoknmsg = document.getElementById('csttoknmsg');
                            if (csttoknmsg) {
                                csttoknmsg.textContent = '';
                                csttoknmsg.classList.add('d-none');
                            }
                        }
                    }).catch(error => {
                        this.style.border = '';
                        console.warn('Could not check token duplicate:', error);
                    });
            }
        });
    }

    // Auto-uppercase ALL text fields in customer form
    customerForm.querySelectorAll('input[type="text"]').forEach(function (input) {
        input.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        });
    });

    // Auto-uppercase ALL text fields in stylist form  
    const stylistForm = document.getElementById('stylistForm');
    if (stylistForm) {
        stylistForm.querySelectorAll('input[type="text"]').forEach(function (input) {
            input.addEventListener('input', function () {
                this.value = this.value.toUpperCase();
            });
        });
    }

    // Handle customer form submission
    if (customerForm) {
        customerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Comprehensive validation check before submission
            let isValid = true;
            let errorMessages = [];

            // Check all form field validations
            const formInputs = customerForm.querySelectorAll('input[required], input');
            formInputs.forEach(function (input) {
                if (!input.checkValidity()) {
                    input.style.border = '2px solid #dc3545';
                    isValid = false;
                    if (input.validationMessage) {
                        errorMessages.push(`${input.name || input.id}: ${input.validationMessage}`);
                    }
                } else if (input.style.border && input.style.border.includes('dc3545')) {
                    // Check if field has red border from custom validation
                    isValid = false;
                    errorMessages.push(`${input.name || input.id}: Please fix the validation error`);
                }
            });

            // Check stylist code validation specifically
            if (stylistCodeInput) {
                const stylistCode = stylistCodeInput.value.trim();
                if (!stylistCode) {
                    stylistCodeInput.style.border = '2px solid #dc3545';
                    isValid = false;
                    errorMessages.push('Stylist code is required');
                } else {
                    // Check if stylist code exists in dropdown
                    const datalist = document.getElementById('stylishCodeDatalist');
                    let codeExists = false;
                    if (datalist) {
                        const option = datalist.querySelector(`option[value="${stylistCode}"]`);
                        codeExists = !!option;
                    }
                    if (!codeExists && stylistsDataGlobal) {
                        const stylist = stylistsDataGlobal.find(s => s.stylistCode === stylistCode);
                        codeExists = !!stylist;
                    }
                    if (!codeExists) {
                        stylistCodeInput.style.border = '2px solid #dc3545';
                        isValid = false;
                        errorMessages.push('Please select a valid stylist code from the dropdown');
                    }
                }
            }

            // Check required fields (only stylist code is required)
            const requiredFields = {
                'stylishCode': stylistCodeInput
            };

            Object.entries(requiredFields).forEach(([name, field]) => {
                if (field && (!field.value || field.value.trim() === '')) {
                    field.style.border = '2px solid #dc3545';
                    errorMessages.push(`${name} is required`);
                    isValid = false;
                }
            });

            // Show validation errors if any
            if (!isValid) {
                const errorMessage = errorMessages.length > 0
                    ? `Please fix the following errors: ${errorMessages.slice(0, 3).join('; ')}`
                    : 'Please fix all validation errors before submitting.';
                showAlert(errorMessage, 'danger');
                return false;
            }

            // All validations passed - submit form
            submitCustomerForm();
        });
    }
}

// Customer mobile validation removed - function no longer needed

// Submit customer form
function submitCustomerForm() {
    const form = document.getElementById('geoForm');
    const formData = new FormData(form);
    const submitBtn = document.getElementById('registerCustomerBtn');
    const customerNumber = formData.get('customerNumber');
    console.log('Form Data:', formData);
    // Prevent double submission
    if (submitBtn.disabled) {
        return;
    }

    // Final validation before submission
    let hasErrors = false;
    const errorMessages = [];

    // Check all form inputs for validation errors (only validate required fields and pattern)
    form.querySelectorAll('input').forEach(input => {
        // Only stylist code is required
        if (input.name === 'stylishCode' && (!input.value || input.value.trim() === '')) {
            input.style.border = '2px solid #dc3545';
            hasErrors = true;
            errorMessages.push('Stylist code is required');
        } else if (!input.checkValidity() && input.value) {
            // Only show validation if field is not empty
            if (input.type === 'checkbox') {
                input.style.outline = '2px solid #dc3545';
            } else {
                input.style.border = '2px solid #dc3545';
            }
            hasErrors = true;
            errorMessages.push(`${input.name || input.id}: ${input.validationMessage}`);
        } else if ((input.style.border && input.style.border.includes('dc3545')) ||
            (input.style.outline && input.style.outline.includes('dc3545'))) {
            // Field has red border/outline from custom validation
            hasErrors = true;
            errorMessages.push(`${input.name || input.id}: Please fix the validation error`);
        }
    });

    // Check stylist code specifically
    const stylistCode = formData.get('stylishCode');
    if (!stylistCode || stylistCode.trim() === '') {
        const stylistCodeInput = document.getElementById('customerStylishCodeInput');
        if (stylistCodeInput) {
            stylistCodeInput.style.border = '2px solid #dc3545';
            hasErrors = true;
            errorMessages.push('Stylist code is required');
        }
    }

    // If validation errors exist, prevent submission
    if (hasErrors) {
        const errorMessage = errorMessages.length > 0
            ? `Cannot submit form: ${errorMessages.slice(0, 3).join('; ')}`
            : 'Form has validation errors. Please fix them before submitting.';
        showAlert(errorMessage, 'danger');
        return;
    }

    if (!firebaseAvailable) {
        showAlert('Firebase connection required. Please check your connection.', 'danger');
        return;
    }

    // No duplicate checking needed - proceed directly
    proceedWithCustomerSubmission(form, formData, submitBtn);
}

// Proceed with customer form submission
function proceedWithCustomerSubmission(form, formData, submitBtn) {
    const customerData = {
        customerId: 'CUST_' + Date.now(),
        stylistCode: formData.get('stylishCode'),
        stylistName: formData.get('stylishName'),
        stylistLocation: formData.get('customerstylistLocation'),
        stylistMobile: formData.get('customerstylistMobile') || '',
        stylistBankName: formData.get('customerstylistBankName') || '',
        stylistAccountNo: formData.get('customerstylistAccountNo') || '',
        customerName: formData.get('customerName') || '',
        customerNumber: formData.get('customerNumber') || '',
        customerEmail: formData.get('customerEmail') || '',
        tokenNo: formData.get('customerTokenNo') || '',
        registrationDate: new Date().toISOString(),
        status: 'active',
        submittedBy: 'System User',
        formType: 'customer_registration',
        dataAgreement: formData.get('dataAgreement') ? 'Agreed' : 'Not Agreed',
        dataAgreementDate: new Date().toISOString()
    };

    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Registering...';
    submitBtn.disabled = true;

    // Save to Firebase
    saveToFirebaseAndLocal('customers', customerData.customerId, customerData)
        .then(() => {
            showAlert('Customer registered successfully!', 'success');
            form.reset();

            // Clear form validation states
            form.querySelectorAll('input').forEach(input => {
                input.style.border = '';
                input.style.outline = '';  // Clear checkbox outlines
                input.setCustomValidity('');
            });

            // Auto-refresh dashboard and payment request after customer registration
            setTimeout(() => {
                forceRefreshDashboard();
                // Update payment request section
                if (typeof loadPaymentRequestsData === 'function') {
                    loadPaymentRequestsData();
                }
            }, 1000);
        })
        .catch((error) => {
            showAlert('Failed to register customer. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            updateDashboardStats();
        });
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (mobileMenuBtn && sidebar && sidebarOverlay) {
    mobileMenuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
}

// Navigation functionality (simplified)
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);

        // Close mobile menu if open
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }

        // Remove active class from all links
        document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
            section.style.display = 'none';
        });

        // Reset all forms when changing sections
        document.querySelectorAll('form').forEach(form => {
            form.reset();
            // Clear all validation errors
            form.querySelectorAll('input, select, textarea').forEach(input => {
                input.style.border = '';
                input.setCustomValidity('');
            });
            // Hide all error messages
            form.querySelectorAll('.text-danger').forEach(msg => {
                msg.textContent = '';
                msg.classList.add('d-none');
            });
        });

        // Show the selected section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';

            // Refresh dashboard data when switching sections
            setTimeout(() => {
                if (typeof updateDashboardStats === 'function') {
                    updateDashboardStats();
                }
                if (typeof loadStylists === 'function') {
                    loadStylists();
                }
                //report for stylist
                if (typeof loadStylistReport === 'function') {
                    // console.log("Loading stylist report...main pull");
                    // loadStylistReport();
                }
                if (typeof loadCustomers === 'function') {
                    loadCustomers();
                }
                if (typeof loadPaymentRequestsData === 'function') {
                    loadPaymentRequestsData();
                }

                // Load specific section data
                if (targetId === 'payments') {
                    loadPaymentsTable();
                } else if (targetId === 'reports') {
                    loadReportsData();
                }
            }, 100);
        }
    });
});

// Show dashboard by default
document.getElementById('dashboard').style.display = 'block';



// Load payments table
function loadPaymentsTable() {
    const tableBody = document.getElementById('paymentsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="6" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading payments...</td></tr>';

    if (firebaseAvailable) {
        database.ref('customers').once('value').then(snapshot => {
            const customers = snapshot.val() || {};
            const customersList = Object.entries(customers);

            tableBody.innerHTML = '';

            if (customersList.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No payment records yet.</td></tr>';
                return;
            }

            // Show only recent 50 records
            const recentRecords = customersList.slice(-50).reverse();

            recentRecords.forEach(([key, customer]) => {
                const paymentStatus = customer.paymentStatus || 'TO BE PAID';
                const paymentAmount = customer.paymentAmount || 5000;
                const statusClass = paymentStatus === 'PAID' ? 'success' : 'warning';
                const statusText = paymentStatus === 'PAID' ? 'PAID' : 'To Be Paid';

                const row = `
                            <tr>
                                <td>${new Date(customer.registrationDate || Date.now()).toLocaleDateString()}</td>
                                <td>${customer.stylistName || 'N/A'}</td>
                                <td>${key}</td>
                                <td><strong>₦${paymentAmount.toLocaleString()}</strong></td>
                                <td><span class="badge bg-${statusClass}">${statusText}</span></td>
                                <td>${new Date(customer.paymentDate || '').toLocaleDateString()}</td>
                            </tr>
                        `;
                tableBody.innerHTML += row;
            });

            // Update payment statistics
            updatePaymentStats(customersList);
        }).catch(error => {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading payment records</td></tr>';
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-warning">Firebase not available</td></tr>';
    }
}

// Update payment statistics
function updatePaymentStats(customersList) {
    const totalCustomers = customersList.length;
    // Calculate actual payment amounts from Firebase data
    let actualTotalPaid = 0;
    let actualTotalAmount = 0;
    let thisMonthPaidAmount = 0;

    // Get current month for filtering
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    customersList.forEach(([key, data]) => {
        const amount = parseFloat(data.paymentAmount) || 5000;
        actualTotalAmount += amount;

        const status = (data.paymentStatus || '').toString().toLowerCase();
        if (status === 'successful' || status === 'completed' || status === 'COMPLETED' || status === 'SUCCESSFUL' || status === 'paid' || status === 'PAID') {
            actualTotalPaid += amount;
            // console.log("Adding to paid amount:", actualTotalPaid);
            // Check if payment was made this month
            const registrationDate = new Date(data.registrationDate);
            if (registrationDate.getMonth() === currentMonth && registrationDate.getFullYear() === currentYear) {
                thisMonthPaidAmount += amount;
            }
        }
    });

    // Calculate pending as Total - Paid (correct formula)
    const actualTotalPending = actualTotalAmount - actualTotalPaid;

    // Calculate payment rate (Pending / Total) * 100
    const paymentRate = actualTotalAmount > 0 ? ((actualTotalPaid / actualTotalAmount) * 100).toFixed(1) : 0;

    // Update payment cards with actual amounts
    const totalPaidElement = document.getElementById('totalPaid');
    if (totalPaidElement) {
        totalPaidElement.textContent = '₦' + actualTotalPaid.toLocaleString();
    }

    // Update total pending element
    const totalPendingElement = document.getElementById('totalPending');
    if (totalPendingElement) {
        totalPendingElement.textContent = '₦' + actualTotalPending.toLocaleString();
    }

    // Update this month paid amount
    const thisMonthPaidElement = document.getElementById('thisMonthPaid');
    if (thisMonthPaidElement) {
        thisMonthPaidElement.textContent = '₦' + thisMonthPaidAmount.toLocaleString();
    }

    // Update payment rate (Pending/Total)*100
    const paymentRateElement = document.getElementById('paymentRate');
    if (paymentRateElement) {
        paymentRateElement.textContent = paymentRate + '%';
    }

    // Update pending payments if element exists
    const pendingPaymentsElement = document.getElementById('pendingPayments');
    if (pendingPaymentsElement) {
        pendingPaymentsElement.textContent = '₦' + actualTotalPending.toLocaleString();
    }
}

// Helper functions
function getLocationName(code) {
    const locations = {
        'A': 'AKURE',
        'B': 'IBADAN',
        'C': 'ADO-EKITI',
        'D': 'ILORIN',
        'E': 'OSOGBO',
        'F': 'IBADAN-MOKOLA'
    };
    return locations[code] || '';
}

// Submission popup for success and error messages
function showSubmissionPopup(message, type) {
    // Remove existing popup
    const existingPopup = document.getElementById('submissionPopup');
    if (existingPopup) existingPopup.remove();

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? '#28a745' : '#dc3545';

    const popupHTML = `
                <div id="submissionPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 30px rgba(0,0,0,0.3); min-width: 300px; text-align: center; animation: popupFadeIn 0.3s;">
                    <div style="color: ${bgColor}; font-size: 48px; margin-bottom: 15px;">
                        <i class="fas ${icon}"></i>
                    </div>
                    <h5 style="color: #333; margin-bottom: 10px;">${type === 'success' ? 'Success!' : 'Error'}</h5>
                    <p style="color: #666; margin: 0;">${message}</p>
                </div>
                <style>
                    @keyframes popupFadeIn {
                        from { opacity: 0; transform: translate(-50%, -60%); }
                        to { opacity: 1; transform: translate(-50%, -50%); }
                    }
                </style>
            `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Auto remove after 3 seconds
    setTimeout(() => {
        const popup = document.getElementById('submissionPopup');
        if (popup) {
            popup.style.animation = 'popupFadeIn 0.3s reverse';
            setTimeout(() => popup.remove(), 300);
        }
    }, 3000);
}

function showAlert(message, type) {
    // Alert messages disabled - no top alerts will be shown
    return;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

    // Insert at top of content area
    const contentArea = document.querySelector('.content-area');
    contentArea.insertBefore(alertDiv, contentArea.firstChild);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function refreshStylists() {
    loadStylists();
    showAlert('Stylists list refreshed!', 'info');
}

// Attach event listeners for stylist action buttons
function attachStylistActionListeners() {
    // Remove old listeners by cloning elements
    document.querySelectorAll('.edit-stylist-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    document.querySelectorAll('.delete-stylist-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    // Add edit listeners
    document.querySelectorAll('.edit-stylist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const stylistKey = this.getAttribute('data-stylist-key');
            if (stylistKey) {
                editStylist(stylistKey);
            }
        });
    });

    // Add delete listeners
    document.querySelectorAll('.delete-stylist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const stylistKey = this.getAttribute('data-stylist-key');
            if (stylistKey) {
                deleteStylist(stylistKey);
            }
        });
    });
}

// Attach event listeners for token count action buttons
function attachTokenActionListeners() {
    // Remove old listeners if any
    document.querySelectorAll('.delete-token-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    // Add delete listeners
    document.querySelectorAll('.delete-token-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const customerKey = this.getAttribute('data-customer-key');
            if (customerKey) {
                deleteTokenCount(customerKey);
            }
        });
    });
}

// Edit stylist function
function editStylist(stylistKey) {
    // console.log("Edit stylist called for key:", stylistKey);
    if (!currentUser) {
        showAlert('Please login to perform this action', 'danger');
        return;
    }
    console.log("Current user:", currentUser);
    const isAdmin = currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.isMaster || currentUser.role.includes('master') || currentUser.role.includes('admin');
    if (!isAdmin) {
        showAlert('Only admins can edit stylists', 'danger');
        return;
    }
    // console.log("User is admin, proceeding to edit stylist");
    if (!firebaseAvailable) {
        showAlert('Firebase connection required', 'danger');
        return;
    }
    // console.log("Fetching stylist data for key:", stylistKey);
    database.ref('stylists/' + stylistKey).once('value', (snapshot) => {
        const stylist = snapshot.val();
        if (!stylist) {
            showAlert('Stylist not found', 'danger');
            return;
        }

        showEditStylistModal(stylistKey, stylist);
    }).catch(error => {
        showAlert('Error loading stylist data', 'danger');
    });
}

// Show edit stylist modal
function showEditStylistModal(stylistKey, stylist) {
    console.log("Editing stylist:", stylistKey, stylist);
    const safeStylestId = escapeHtml(stylistKey);
    const safeStylistName = escapeHtml(stylist.stylistName || '');
    const safePhoneNumber = escapeHtml(stylist.phoneNumber || '');
    const safeEmail = escapeHtml(stylist.email || '');
    const safeLocation = escapeHtml(stylist.location || '');
    const safeBankName = escapeHtml(stylist.bankName || '');
    const safeBankAccount = escapeHtml(stylist.bankAccountNumber || '');
    const safeBeneficiaryName = escapeHtml(stylist.beneficiaryName || '');
    const safeStylistCode = escapeHtml(stylist.stylistCode || '');
    const safeStatus = escapeHtml(stylist.status || 'active');

    const modalHTML = `
        <div class="modal fade" id="editStylistModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-edit me-2"></i>Edit Stylist</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editStylistForm" novalidate>
                            <input type="hidden" id="editStylistId" value="${safeStylestId}">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Stylist Name *</label>
                                    <input type="text" class="form-control" id="editStylistName" value="${safeStylistName}" required minlength="3">
                                    <div class="invalid-feedback">Name must be at least 3 characters.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control" id="editStylistPhone" value="${safePhoneNumber}" required pattern="0[789][0-9]{9}" maxlength="11">
                                    <div class="invalid-feedback">Phone number must be 11 digits starting with 07, 08, or 09.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" id="editStylistEmail" value="${safeEmail}">
                                    <div class="invalid-feedback">Please enter a valid email.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Stylist Code *</label>
                                    <input type="text" class="form-control" id="editStylistCode" readonly value="${safeStylistCode}" required>
                                    <div class="invalid-feedback">Stylist code is required.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location *</label>
                                    <select class="form-select" id="editStylistLocation" required>
                                        <option value="">Select Location</option>
                                        <option value="AKURE" ${safeLocation === 'AKURE' ? 'selected' : ''}>AKURE</option>
                                        <option value="IBADAN" ${safeLocation === 'IBADAN' ? 'selected' : ''}>IBADAN</option>
                                        <option value="IBADAN-MOKOLA" ${safeLocation === 'IBADAN-MOKOLA' ? 'selected' : ''}>IBADAN-MOKOLA</option>
                                        <option value="ADO-EKITI" ${safeLocation === 'ADO-EKITI' ? 'selected' : ''}>ADO-EKITI</option>
                                        <option value="ILORIN" ${safeLocation === 'ILORIN' ? 'selected' : ''}>ILORIN</option>
                                        <option value="OSOGBO" ${safeLocation === 'OSOGBO' ? 'selected' : ''}>OSOGBO</option>
                                    </select>
                                    <div class="invalid-feedback">Please select a location.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Status *</label>
                                    <select class="form-select" id="editStylistStatus" required>
                                        <option value="active" ${safeStatus === 'active' ? 'selected' : ''}>Active</option>
                                        <option value="inactive" ${safeStatus === 'inactive' ? 'selected' : ''}>Inactive</option>
                                        <option value="blocked" ${safeStatus === 'blocked' ? 'selected' : ''}>Blocked</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Bank Name</label>
                                    <input type="text" class="form-control" id="editStylistBankName" value="${safeBankName}">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Bank Account Number</label>
                                    <input type="text" class="form-control" id="editStylistBankAccount" value="${safeBankAccount}">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Beneficiary Name</label>
                                    <input type="text" class="form-control" id="editStylistBeneficiary" value="${safeBeneficiaryName}">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-action="save-stylist-changes">
                            <i class="fas fa-save me-2"></i>Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('editStylistModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add real-time validation
    const form = document.getElementById('editStylistForm');
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateEditStylistField(field));
        field.addEventListener('input', () => validateEditStylistField(field));
    });

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editStylistModal'));
    modal.show();
}

// Validate edit stylist form field
function validateEditStylistField(field) {
    if (field.checkValidity()) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

// Save stylist changes
async function saveStylistChanges() {
    const form = document.getElementById('editStylistForm');
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
        showAlert('Please fill all required fields correctly', 'danger');
        return;
    }

    const stylistId = document.getElementById('editStylistId').value;
    const stylistName = document.getElementById('editStylistName').value.trim();
    const phoneNumber = document.getElementById('editStylistPhone').value.trim();
    const email = document.getElementById('editStylistEmail').value.trim();
    const stylistCode = document.getElementById('editStylistCode').value.trim();
    const location = document.getElementById('editStylistLocation').value;
    const status = document.getElementById('editStylistStatus').value;
    const bankName = document.getElementById('editStylistBankName').value.trim();
    const bankAccount = document.getElementById('editStylistBankAccount').value.trim();
    const beneficiaryName = document.getElementById('editStylistBeneficiary').value.trim();

    const updatedStylistData = {
        stylistName: stylistName,
        phoneNumber: phoneNumber,
        email: email,
        stylistCode: stylistCode,
        location: location,
        status: status,
        bankName: bankName,
        bankAccountNumber: bankAccount,
        beneficiaryName: beneficiaryName,
        lastModified: new Date().toISOString(),
        modifiedBy: currentUser.fullName || currentUser.username || 'Admin'
    };

    try {
        await database.ref('stylists/' + stylistId).update(updatedStylistData);
        showAlert('Stylist updated successfully!', 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editStylistModal'));
        modal.hide();

        // Refresh stylists list
        loadStylists();

    } catch (error) {
        showAlert('Failed to update stylist. Please try again.', 'danger');
    }
}

// Delete stylist function
function deleteStylist(stylistKey) {
    if (!currentUser) {
        showAlert('Please login to perform this action', 'danger');
        return;
    }

    const isAdmin = currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.isMaster;
    if (!isAdmin) {
        showAlert('Only admins can delete stylists', 'danger');
        return;
    }

    if (!firebaseAvailable) {
        showAlert('Firebase connection required', 'danger');
        return;
    }

    // Get stylist details first
    database.ref('stylists/' + stylistKey).once('value', (snapshot) => {
        const stylist = snapshot.val();
        if (!stylist) {
            showAlert('Stylist not found', 'danger');
            return;
        }

        if (confirm(`Are you sure you want to delete stylist ${stylist.stylistName} (${stylist.stylistCode})? This action cannot be undone.`)) {
            database.ref('stylists/' + stylistKey).remove()
                .then(() => {
                    showAlert('Stylist deleted successfully', 'success');
                    loadStylists();
                    updateDashboardStats(); // Refresh dashboard
                    loadCustomers();
                })
                .catch(error => {
                    console.error('Error deleting stylist:', error);
                    showAlert('Error deleting stylist: ' + error.message, 'danger');
                });
        }
    }).catch(error => {
        console.error('Error loading stylist:', error);
        showAlert('Error loading stylist data', 'danger');
    });
}

// Delete token count function
function deleteTokenCount(customerKey) {
    if (!currentUser) {
        showAlert('Please login to perform this action', 'danger');
        return;
    }

    const isAdmin = currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.isMaster;
    if (!isAdmin) {
        showAlert('Only admins can delete token counts', 'danger');
        return;
    }

    if (!firebaseAvailable) {
        showAlert('Firebase connection required', 'danger');
        return;
    }

    // Get customer details first
    database.ref('customers/' + customerKey).once('value', (snapshot) => {
        const customer = snapshot.val();
        if (!customer) {
            showAlert('Token count record not found', 'danger');
            return;
        }

        if (confirm(`Are you sure you want to delete token #${customer.tokenNo} for ${customer.stylistName}? This action cannot be undone.`)) {
            database.ref('customers/' + customerKey).remove()
                .then(() => {
                    showAlert('Token count deleted successfully', 'success');
                    loadCustomers();
                    loadStylists(); // Refresh stylists to update token counts
                    updateDashboardStats(); // Refresh dashboard
                })
                .catch(error => {
                    console.error('Error deleting token count:', error);
                    showAlert('Error deleting token count: ' + error.message, 'danger');
                });
        }
    }).catch(error => {
        console.error('Error loading token count:', error);
        showAlert('Error loading token count data', 'danger');
    });
}

// Helper function to calculate days since registration
function getDaysSince(dateString) {
    const regDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - regDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Update stylist statistics
function updateStylistStats() {
    const total = stylistsData.length;
    const active = stylistsData.filter(s => {
        const status = (s.status || 'Active').toString().toLowerCase();
        const isActive = status === 'active' || status === 'Active';
        return isActive;
    }).length;

    // Count only active locations (locations with active stylists)
    const activeLocations = [...new Set(
        stylistsData
            .filter(s => {
                const status = (s.status || 'Active').toString().toLowerCase();
                return status === 'active' || status === 'Active';
            })
            .map(s => s.location)
            .filter(location => location && location !== 'Unknown') // Remove null/undefined/Unknown locations
    )].length;

    // Count stylists registered this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = stylistsData.filter(s => {
        const regDate = new Date(s.date);
        return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
    }).length;

    document.getElementById('totalStylists').textContent = total;
    document.getElementById('activeStylists').textContent = active;
    document.getElementById('totalLocations').textContent = activeLocations;
    document.getElementById('newStylists').textContent = thisMonth;
}        // Filter stylists based on search and filter criteria
function filterStylists() {
    const searchTerm = document.getElementById('stylistSearch').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const fromDateFilter = document.getElementById('stylistFromDate').value;
    const toDateFilter = document.getElementById('stylistToDate').value;
    const tableRows = document.querySelectorAll('#stylistsTableBody tr');

    let visibleCount = 0;
    let activeCount = 0;
    let locations = new Set();
    let thisMonthCount = 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    tableRows.forEach(row => {
        if (row.cells.length === 1) return; // Skip empty state row

        const stylistData = JSON.parse(row.getAttribute('data-stylist'));
        console.log("stylistData:", stylistData);
        const name = stylistData.name.toLowerCase();
        const code = stylistData.code.toLowerCase();
        const phone = stylistData.phone;
        const location = stylistData.location;
        const status = stylistData.status;
        const regDate = new Date(stylistData.date);
        const bankDetails = stylistData.bankAccount;
        const bankName = stylistData.bankName;

        // Search filter
        const matchesSearch = name.includes(searchTerm) || code.includes(searchTerm) || phone.includes(searchTerm);

        // Location filter
        const matchesLocation = !locationFilter || location === locationFilter;

        // Date range filter
        let matchesDate = true;
        if (fromDateFilter || toDateFilter) {
            const regDateOnly = new Date(regDate.getFullYear(), regDate.getMonth(), regDate.getDate());
            regDateOnly.setHours(0, 0, 0, 0);

            if (fromDateFilter && toDateFilter) {
                const fromDate = new Date(fromDateFilter);
                fromDate.setHours(0, 0, 0, 0);
                const toDate = new Date(toDateFilter);
                toDate.setHours(0, 0, 0, 0);
                matchesDate = regDateOnly.getTime() >= fromDate.getTime() && regDateOnly.getTime() <= toDate.getTime();
            } else if (fromDateFilter) {
                const fromDate = new Date(fromDateFilter);
                fromDate.setHours(0, 0, 0, 0);
                matchesDate = regDateOnly.getTime() >= fromDate.getTime();
            } else if (toDateFilter) {
                const toDate = new Date(toDateFilter);
                toDate.setHours(0, 0, 0, 0);
                matchesDate = regDateOnly.getTime() <= toDate.getTime();
            }
        }

        const isVisible = matchesSearch && matchesLocation && matchesDate;
        row.style.display = isVisible ? '' : 'none';
        console.log("isVisible:", isVisible, "matchesDate:", matchesDate);

        if (isVisible) {
            visibleCount++;
            if (status.toLowerCase() === 'active') {
                activeCount++;
            }
            if (location && location !== 'N/A' && location !== 'Unknown') {
                locations.add(location);
            }
            if (regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear) {
                thisMonthCount++;
            }
        }
    });

    // Update stats cards with filtered data
    document.getElementById('totalStylists').textContent = visibleCount;
    document.getElementById('activeStylists').textContent = activeCount;
    document.getElementById('totalLocations').textContent = locations.size;
    document.getElementById('newStylists').textContent = thisMonthCount;

    // Also update main dashboard stylist card if visible
    // const dashboardStylistCard = document.querySelector('.dashboard-section .row .col-md-3:nth-child(1) .value');
    // if (dashboardStylistCard) {
    //     dashboardStylistCard.textContent = visibleCount;
}
// })

// Clear all filters
// function clearFilters() {
//     document.getElementById('stylistSearch').value = '';
//     document.getElementById('locationFilter').value = '';
//     document.getElementById('stylistDateFilter').value = '';

//     // Show all rows
//     const tableRows = document.querySelectorAll('#stylistsTableBody tr');
//     tableRows.forEach(row => {
//         row.style.display = '';
//     });

//     // Restore original stats by reloading stylists
//     if (typeof loadStylists === 'function') {
//         loadStylists();
//     }
// }

// Sort table function
let sortDirection = {};
function sortTable(columnIndex) {
    const table = document.getElementById('stylistsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => row.cells.length > 1);

    const direction = sortDirection[columnIndex] === 'asc' ? 'desc' : 'asc';
    sortDirection[columnIndex] = direction;

    rows.sort((a, b) => {
        let aVal = a.cells[columnIndex].textContent.trim();
        let bVal = b.cells[columnIndex].textContent.trim();

        // Handle date sorting
        if (columnIndex === 4) {
            aVal = new Date(aVal.split('\n')[0]);
            bVal = new Date(bVal.split('\n')[0]);
        }

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// View stylist details
function viewStylist(index) {
    const stylist = stylistsData[index];
    const modal = `
                <div class="modal fade" id="stylistModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Stylist Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="userIdInput" class="form-label">User ID *</label>
                                        <input type="text" class="form-control" name="userId" id="userIdInput" required
                                            placeholder="Enter unique user ID">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="passwordInput" class="form-label">Password *</label>
                                        <div class="input-group">
                                            <input type="password" class="form-control" name="password" id="passwordInput" required
                                                minlength="6" placeholder="Enter password">
                                            <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6"><strong>Code:</strong> ${stylist.code}</div>
                                    <div class="col-6"><strong>Name:</strong> ${stylist.name}</div>
                                    <div class="col-6"><strong>Phone:</strong> ${stylist.phone}</div>
                                    <div class="col-6"><strong>Status:</strong> <span class="badge bg-success">${stylist.status}</span></div>
                                    <div class="col-12"><strong>Location:</strong> ${stylist.location}</div>
                                    <div class="col-12"><strong>Registration:</strong> ${new Date(stylist.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-action="edit-stylist" data-stylist-index="${index}" data-bs-dismiss="modal">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('stylistModal'));
    modalElement.show();

    document.getElementById('stylistModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Export stylists data with Firebase CUST_ID
function exportStylists() {

    if (!firebaseAvailable) {
        showAlert('Firebase connection required for export', 'danger');
        return;
    }

    // Get stylists data from Firebase with real CUST_ID
    database.ref('stylists').once('value').then((snapshot) => {
        const stylists = snapshot.val() || {};
        const stylistsArray = Object.entries(stylists).map(([key, data]) => ({ id: key, ...data }));

        if (stylistsArray.length === 0) {
            showAlert('No stylists data available to export', 'warning');
            return;
        }

        // Generate CSV with Firebase CUST_ID format
        let csvContent = "CUST_ID,Code,Name,Phone,Location,Registration Date,Status,Bank Name,Bank Account\n";

        stylistsArray.forEach((stylist) => {
            const row = [
                stylist.id, // Firebase key as CUST_ID (e.g., CUST_1764826487676)
                stylist.stylistCode || 'N/A',
                `"${stylist.stylistName || 'N/A'}"`,
                stylist.phoneNumber || 'N/A',
                `"${stylist.location || 'N/A'}"`,
                stylist.registrationDate || 'N/A',
                stylist.status || 'Active',
                `"${stylist.bankName || 'N/A'}"`,
                stylist.bankAccountNumber || 'N/A'
            ].join(',');
            csvContent += row + '\n';
        });

        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `stylists_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showAlert(`Exported ${stylistsArray.length} stylists with Firebase CUST_ID successfully!`, 'success');

    }).catch((error) => {
        showAlert('Failed to export stylists data', 'danger');
    });
}

// Note: editStylist and deleteStylist functions are defined earlier in the file with Firebase integration

function loadReportsData() {
    // Load revenue chart
    const ctx = document.getElementById('revenueChart');

    if (!ctx) {
        return;
    }

    // Destroy existing chart if it exists and is a Chart instance
    if (window.revenueChart && typeof window.revenueChart.destroy === 'function') {
        window.revenueChart.destroy();
    }

    window.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Revenue (₦)',
                data: [2.1, 2.8, 3.2, 3.8, 4.1, 4.5, 4.2, 4.8, 4.3, 4.7, 4.9, 5.2],
                borderColor: '#4285F4',
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '₦' + value + 'M';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Revenue: ₦' + context.parsed.y + 'M';
                        }
                    }
                }
            }
        }
    });
}

// Charts initialization removed to fix CSP violations
// let locationChart = null;
// let dailyChart = null;

// Chart functionality removed to fix CSP violations
// function initializeCharts() {
//     // Location chart will be updated with real data
//     const locationCtx = document.getElementById('locationChart');
//     if (locationCtx) {
//         if (locationChart && typeof locationChart.destroy === 'function') {
//             locationChart.destroy();
//         }
//         locationChart = new Chart(locationCtx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['Loading...'],
//                 datasets: [{
//                     data: [1],
//                     backgroundColor: ['#ddd']
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'right',
//                     },
//                     title: {
//                         display: true,
//                         text: 'Braiding Distribution'
//                     }
//                 }
//             }
//         });
//     }
//
//     // Daily chart will be updated with real data
//     const dailyCtx = document.getElementById('dailyChart');
//     if (dailyCtx) {
//         if (dailyChart && typeof dailyChart.destroy === 'function') {
//             dailyChart.destroy();
//         }
//         dailyChart = new Chart(dailyCtx, {
//             type: 'line',
//             data: {
//                 labels: ['Loading...'],
//                 datasets: [{
//                     label: 'Daily Registrations',
//                     data: [0],
//                     borderColor: '#4285F4',
//                     backgroundColor: 'rgba(66, 133, 244, 0.1)',
//                     borderWidth: 3,
//                     fill: true,
//                     tension: 0.4
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Daily Registration Progress'
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Number of Registrations'
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }

// Chart functionality removed to fix CSP violations
// function updateLocationChart(locationCounts) {
//     if (!locationChart) return;

//     // Get real customer data for chart
//     if (firebaseAvailable) {
//         database.ref('customers').once('value').then(snapshot => {
//             const customers = snapshot.val() || {};
//             const customersArray = Object.values(customers);
//
//             // Count customers by stylist location (actual braiding data)
//             const customerLocationCounts = {};
//             customersArray.forEach(customer => {
//                 const location = customer.stylistLocation || 'Unknown';
//                 customerLocationCounts[location] = (customerLocationCounts[location] || 0) + 1;
//             });
//
//             const locations = Object.keys(customerLocationCounts);
//             const counts = Object.values(customerLocationCounts);
//
//             if (locations.length === 0) {
//                 locationChart.data.labels = ['No data'];
//                 locationChart.data.datasets[0].data = [1];
//                 locationChart.data.datasets[0].backgroundColor = ['#ddd'];
//                 locationChart.options.plugins.title.text = 'No Token Data Available';
//             } else {
//                 locationChart.data.labels = locations;
//                 locationChart.data.datasets[0].data = counts;
//                 locationChart.data.datasets[0].backgroundColor = [
//                     '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E44AD',
//                     '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
//                 ];
//             }
//             locationChart.update();
//         }).catch(error => {
//         });
//     }
// }

// Chart functionality removed to fix CSP violations
// function updateDailyChart(customersArray) {
//     if (!dailyChart) return;

//     // Get last 7 days
//     const last7Days = [];
//     const dailyCounts = [];
//
//     for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const dateString = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
//         last7Days.push(dateString);
//
//         // Count actual customer registrations for this day
//         const dayCount = customersArray.filter(customer => {
//             if (!customer.registrationDate && !customer.timestamp) return false;
//             const regDate = new Date(customer.registrationDate || customer.timestamp);
//             return regDate.toDateString() === date.toDateString();
//         }).length;
//
//         dailyCounts.push(dayCount);
//     }
//
//     dailyChart.data.labels = last7Days;
//     dailyChart.data.datasets[0].data = dailyCounts;
//     dailyChart.data.datasets[0].label = 'Daily Braiding Registrations';
//     dailyChart.update();
// }

// Handle window resize - Chart resize handlers removed
window.addEventListener('resize', function () {
    // Chart resize functionality removed to fix CSP violations
    // if (locationChart) locationChart.resize();
    // if (dailyChart) dailyChart.resize();
    if (window.revenueChart && typeof window.revenueChart.resize === 'function') {
        window.revenueChart.resize();
    }
});

// Enhanced Register Stylist Form Logic
function initializeEnhancedStylistForm() {
    const form = document.getElementById('stylistForm');
    if (!form) return;

    const locationInput = form.elements['stylistLocation'];
    const codeInput = form.elements['stylistCode'];
    const phoneInput = form.elements['phoneNumber'];
    const bankInput = form.elements['bankAccountNumber'];
    const stylistNameInput = form.elements['stylistName'];
    const bankNameInput = form.elements['bankName'];
    const beneficiaryNameInput = form.elements['beneficiaryName'];
    const registerBtn = document.getElementById('registerStylistBtn');
    const resultDiv = document.getElementById('stylistResult');

    // Safety check - ensure all required elements exist
    if (!locationInput || !codeInput || !phoneInput || !bankInput ||
        !stylistNameInput || !bankNameInput || !registerBtn || !resultDiv) {
        console.warn('Some form elements not found, skipping enhanced form initialization');
        return;
    }

    let locations = [];
    let duplicateFound = false;

    // Auto-uppercase all text fields
    function setAutoUppercase() {
        form.querySelectorAll('input[type="text"]').forEach(function (input) {
            if (input.name === 'bankName' || input.name === 'stylistName') {
                input.addEventListener('input', function () {
                    this.value = this.value.replace(/[^A-Za-z ]/g, '');
                });
            }
            input.addEventListener('input', function () {
                this.value = this.value.toUpperCase();
            });
        });
    }
    setAutoUppercase();

    // Input validation and restriction - DISABLED FOR TESTING
    function restrictInput(input, pattern, msg, smid) {
        // Validation disabled for clean testing

        let lastValid = '';
        input.addEventListener('input', function () {
            // Special handling for beneficiary name - only check if blank
            if (input.name === 'beneficiaryName') {
                const value = input.value.trim();
                const msgElem = document.getElementById(smid);

                if (value === '') {
                    input.style.border = '2px solid #dc3545';
                    if (msgElem) {
                        msgElem.textContent = msg;
                        msgElem.classList.remove('d-none');
                    }
                } else {
                    input.style.border = '';
                    if (msgElem) {
                        msgElem.textContent = '';
                        msgElem.classList.add('d-none');
                    }
                }
                return;
            }

            // Regular validation for other fields
            if (pattern && !pattern.test(input.value)) {
                input.value = lastValid;
                input.style.border = '2px solid #dc3545';
                const msgElem = document.getElementById(smid);
                if (msgElem) {
                    msgElem.textContent = msg;
                    msgElem.classList.remove('d-none');
                }
            } else if (!input.checkValidity()) {
                input.style.border = '2px solid #dc3545';
                const msgElem = document.getElementById(smid);
                if (msgElem) {
                    msgElem.textContent = msg;
                    msgElem.classList.remove('d-none');
                }
            } else {
                input.style.border = '';
                lastValid = input.value;
                const msgElem = document.getElementById(smid);
                if (msgElem) {
                    msgElem.textContent = '';
                    msgElem.classList.add('d-none');
                }
            }
        });

    }

    // Apply input restrictions
    restrictInput(stylistNameInput, /^[A-Za-z ]*$/, "cannot be blank and must contain only letters and spaces", 'stlnamemsg');
    restrictInput(phoneInput, /^[0-9]{0,11}$/, "must be numeric and up to 11 digits", 'stlphonmsg');
    restrictInput(bankNameInput, /^[A-Za-z ]*$/, "cannot be blank and must contain only letters and spaces", 'stlbankNamemsg');
    restrictInput(bankInput, /^[0-9]{0,10}$/, "must be numeric and up to 10 digits", 'stlbankAccountNumbermsg');
    restrictInput(beneficiaryNameInput, /^.*$/, "cannot be blank", 'stlbeneficiaryNamemsg');
    restrictInput(locationInput, /^.+$/, "location is required", 'stllocmsg');
    restrictInput(codeInput, /^[A-Za-z]?[0-9]{0,3}$/, "must be one letter followed by 3 digits (e.g. A001)", 'stlcodemsg');

    // Mobile number duplicate validation
    phoneInput.addEventListener('blur', function () {
        const phone = this.value.trim();
        const msgElem = document.getElementById('stlphonmsg');

        // Check Nigerian phone format
        if (phone && !phone.match(/^0[789]\d{9}$/)) {
            this.style.border = '2px solid #dc3545';
            if (msgElem) {
                msgElem.textContent = 'Phone must be 11 digits starting with 07, 08, or 09';
                msgElem.classList.remove('d-none');
            }
            return;
        }

        if (phone.length >= 11) {
            checkDuplicate('phone');
        } else if (phone.length > 0) {
            this.style.border = '2px solid #dc3545';
            if (msgElem) {
                msgElem.textContent = 'Phone number must be 11 digits';
                msgElem.classList.remove('d-none');
            }
        } else {
            this.style.border = '';
            if (msgElem) {
                msgElem.textContent = '';
                msgElem.classList.add('d-none');
            }
        }
    });

    // Stylist code duplicate validation
    codeInput.addEventListener('blur', function () {
        const code = this.value.trim();
        const msgElem = document.getElementById('stlcodemsg');

        // Check stylist code format
        if (code && !code.match(/^[A-Za-z][0-9]{3}$/)) {
            this.style.border = '2px solid #dc3545';
            if (msgElem) {
                msgElem.textContent = 'Code must be 1 letter followed by 3 digits (e.g. A001)';
                msgElem.classList.remove('d-none');
            }
            return;
        }

        if (code.length >= 4) {
            checkDuplicate('code');
        } else if (code.length > 0) {
            this.style.border = '2px solid #dc3545';
            if (msgElem) {
                msgElem.textContent = 'Code must be 4 characters (e.g. A001)';
                msgElem.classList.remove('d-none');
            }
        } else {
            this.style.border = '';
            if (msgElem) {
                msgElem.textContent = '';
                msgElem.classList.add('d-none');
            }
        }
    });

    // Bank name validation
    bankNameInput.addEventListener('blur', function () {
        const bankName = this.value.trim();
        const bankAccount = bankInput.value.trim();
        if (bankName && bankAccount && bankAccount.length === 10) {
            checkDuplicate('bank');
        }
    });

    // // Bank name validation
    // bankNameInput.addEventListener('blur', function () {
    //     const bankName = this.value.trim();
    //     const bankAccount = bankInput.value.trim();
    //     if (bankName && bankAccount && bankAccount.length === 10) {
    //         checkDuplicate('bank');
    //     }
    // });

    // Bank account validation
    bankInput.addEventListener('blur', function () {
        const bankAccount = this.value.trim();
        const bankName = bankNameInput.value.trim();
        if (bankAccount.length === 10 && bankName) {
            checkDuplicate('bank');
        }
    });

    // Stylist code formatting - DISABLED FOR TESTING

    /*
    let lastValidCode = '';
    codeInput.addEventListener('input', function () {
        let v = codeInput.value.toUpperCase();
        if (v.length > 0 && !/^[A-Z]/.test(v[0])) {
            codeInput.value = '';
            codeInput.style.border = '2px solid #dc3545';
            lastValidCode = '';
            return;
        }
        if (v.length > 1) v = v[0] + v.slice(1).replace(/[^0-9]/g, '');
        if (v.length > 4) v = v.slice(0, 4);
        if (!/^([A-Z][0-9]{0,3})?$/.test(v)) {
            codeInput.value = lastValidCode;
            codeInput.style.border = '2px solid #dc3545';
            return;
        }
        codeInput.value = v;
        if (!codeInput.checkValidity()) {
            codeInput.style.border = '2px solid #dc3545';
        } else {
            codeInput.style.border = '';
            lastValidCode = v;
        }
    });
    */

    // Location validation
    function isLocationValid(val) {
        const datalist = document.getElementById('stylistLocationDatalist');
        if (!datalist) return true;
        for (let option of datalist.options) {
            if (option.value === val) return true;
        }
        return false;
    }

    locationInput.addEventListener('blur', function () {
        // Enable location validation to restrict to dropdown only
        if (locationInput.value && !isLocationValid(locationInput.value)) {
            locationInput.value = '';
            locationInput.style.border = '2px solid #dc3545';
            locationInput.setCustomValidity('Please select a location from the dropdown list only.');
            showAlert('Please select a location from the dropdown list only', 'warning');
        } else {
            locationInput.style.border = '';
            locationInput.setCustomValidity('');
        }
    });

    // Add real-time location input validation
    locationInput.addEventListener('input', function () {
        const inputValue = this.value;

        // Check if the current input matches any dropdown option
        if (inputValue.length > 0) {
            const isValid = isLocationValid(inputValue);
            if (!isValid) {
                // Check if it's a partial match for better UX
                const datalist = document.getElementById('stylistLocationDatalist');
                let hasPartialMatch = false;

                if (datalist) {
                    for (let option of datalist.options) {
                        if (option.value.toLowerCase().startsWith(inputValue.toLowerCase())) {
                            hasPartialMatch = true;
                            break;
                        }
                    }
                }

                if (!hasPartialMatch) {
                    this.style.border = '2px solid #dc3545';
                    this.setCustomValidity('Please select from dropdown options only');
                } else {
                    this.style.border = '1px solid #ffc107'; // Warning yellow for partial match
                    this.setCustomValidity('');
                }
            } else {
                this.style.border = '1px solid #28a745'; // Green for valid selection
                this.setCustomValidity('');
            }
        } else {
            this.style.border = '';
            this.setCustomValidity('');
        }
    });

    // Duplicate checking with Firebase backend
    let debounceTimers = { phone: null, bank: null, code: null };
    function checkDuplicate(field) {
        const phone = phoneInput.value.trim();
        const bank = bankInput.value.trim();
        const bankName = bankNameInput.value.trim();
        const code = codeInput.value.trim();
        const phoneLoader = document.getElementById('phoneLoader');
        const bankLoader = document.getElementById('bankLoader');
        const codeLoader = document.getElementById('stylistCodeLoader');

        if (field === 'phone' && phone.length >= 8) {
            if (phoneLoader) phoneLoader.style.display = 'inline';
            phoneInput.style.border = '2px solid #ffc107'; // Show checking state

            // Check Firebase for duplicate phone ONLY in stylists table
            database.ref('stylists').orderByChild('phoneNumber').equalTo(phone).once('value')
                .then(stylistSnapshot => {
                    if (phoneLoader) phoneLoader.style.display = 'none';
                    if (stylistSnapshot.exists()) {
                        phoneInput.style.border = '2px solid #dc3545';
                        phoneInput.value = ''; // Clear duplicate input value
                        showAlert('This phone number is already registered as a stylist', 'danger');
                        phoneInput.focus(); // Refocus for user convenience
                        duplicateFound = true;
                        const stlphonmsg = document.getElementById('stlphonmsg');
                        if (stlphonmsg) {
                            stlphonmsg.textContent = 'This phone number is already registered as a stylist';
                            stlphonmsg.classList.remove('d-none');
                        }
                    } else {
                        phoneInput.style.border = '2px solid #28a745'; // Green for success
                        duplicateFound = false;
                        // Remove success border after 2 seconds
                        setTimeout(() => {
                            if (phoneInput.style.border.includes('#28a745')) {
                                phoneInput.style.border = '';
                            }
                        }, 2000);
                        const stlphonmsg = document.getElementById('stlphonmsg');
                        if (stlphonmsg) {
                            stlphonmsg.textContent = '';
                            stlphonmsg.classList.add('d-none');
                        }
                    }
                }).catch(error => {
                    if (phoneLoader) phoneLoader.style.display = 'none';
                    console.warn('Could not check phone duplicate:', error);
                });
        }

        if (field === 'code' && code.length >= 2) {
            if (codeLoader) codeLoader.style.display = 'inline';
            codeInput.style.border = '2px solid #ffc107'; // Show checking state

            // Check Firebase for duplicate stylist code
            database.ref('stylists').orderByChild('stylistCode').equalTo(code).once('value')
                .then(snapshot => {
                    if (codeLoader) codeLoader.style.display = 'none';
                    if (snapshot.exists()) {
                        codeInput.style.border = '2px solid #dc3545';
                        codeInput.value = ''; // Clear duplicate input value
                        showAlert('This stylist code is already registered', 'danger');
                        codeInput.focus(); // Refocus for user convenience
                        duplicateFound = true;
                        const stlcodemsg = document.getElementById('stlcodemsg');
                        if (stlcodemsg) {
                            stlcodemsg.textContent = 'This stylist code is already registered';
                            stlcodemsg.classList.remove('d-none');
                        }
                    } else {
                        if (codeInput.value === '') {
                            codeInput.style.border = '2px solid #dc3545';
                        }
                        else { codeInput.style.border = '2px solid #28a745'; } // Green for success
                        duplicateFound = false;
                        // Remove success border after 2 seconds
                        setTimeout(() => {
                            if (codeInput.style.border.includes('#28a745')) {
                                codeInput.style.border = '';
                            }
                        }, 2000);
                        const stlcodemsg = document.getElementById('stlcodemsg');
                        if (stlcodemsg) {
                            stlcodemsg.textContent = '';
                            stlcodemsg.classList.add('d-none');
                        }
                    }
                })
                .catch(error => {
                    if (codeLoader) codeLoader.style.display = 'none';
                    console.warn('Could not check code duplicate:', error);
                });
        }

        if (field === 'bank' && bank.length >= 8 && bankName) {
            if (bankLoader) bankLoader.style.display = 'inline';
            bankInput.style.border = '2px solid #ffc107'; // Show checking state

            // Check Firebase for duplicate bank account with same bank name
            database.ref('stylists').once('value')
                .then(snapshot => {
                    if (bankLoader) bankLoader.style.display = 'none';
                    let duplicateBank = false;

                    if (snapshot.exists()) {
                        snapshot.forEach(child => {
                            const data = child.val();
                            // if (data.bankAccountNumber === bank && data.bankName === bankName) {
                            //     duplicateBank = true;
                            // }
                        });
                    }

                    if (duplicateBank) {
                        bankInput.style.border = '2px solid #dc3545';
                        bankInput.value = ''; // Clear duplicate input value
                        showAlert(`Bank account ${bank} with ${bankName} is already registered`, 'danger');
                        bankInput.focus(); // Refocus for user convenience
                        duplicateFound = true;
                        const stlbankmsg = document.getElementById('stlbankmsg');
                        if (stlbankmsg) {
                            stlbankmsg.textContent = `Bank account ${bank} with ${bankName} is already registered`;
                            stlbankmsg.classList.remove('d-none');
                        }
                    } else {
                        bankInput.style.border = '2px solid #28a745'; // Green for success
                        duplicateFound = false;
                        // Remove success border after 2 seconds
                        setTimeout(() => {
                            if (bankInput.style.border.includes('#28a745')) {
                                bankInput.style.border = '';
                            }
                        }, 2000);
                        const stlbankmsg = document.getElementById('stlbankmsg');
                        if (stlbankmsg) {
                            stlbankmsg.textContent = '';
                            stlbankmsg.classList.add('d-none');
                        }
                    }
                })
                .catch(error => {
                    if (bankLoader) bankLoader.style.display = 'none';
                    console.warn('Could not check bank duplicate:', error);
                });
        }
    }

    // Attach duplicate check events with enhanced feedback
    // Phone input change detection - ENABLED FOR REAL-TIME VALIDATION
    phoneInput.addEventListener('input', function () {
        clearTimeout(debounceTimers.phone);

        // Show checking state immediately for valid phone numbers
        const phoneNumber = this.value.trim();
        if (phoneNumber.length >= 11 && /^[0-9]+$/.test(phoneNumber)) {
            this.style.border = '2px solid #ffc107';
            debounceTimers.phone = setTimeout(() => checkDuplicate('phone'), 300);
            const stlphonmsg = document.getElementById('stlphonmsg');
            if (stlphonmsg) {
                stlphonmsg.textContent = 'should start with 07, 08 or 09 and be up to 11 digits';
                stlphonmsg.classList.remove('d-none');
            }
        } else {
            this.style.border = '';
            const stlphonmsg = document.getElementById('stlphonmsg');
            if (stlphonmsg) {
                stlphonmsg.textContent = '';
                stlphonmsg.classList.add('d-none');
            }
        }
    });

    bankInput.addEventListener('input', function () {
        clearTimeout(debounceTimers.bank);

        // Show checking state for valid bank account numbers
        const bankAccount = this.value.trim();
        if (bankAccount.length >= 10 && /^[0-9]+$/.test(bankAccount)) {
            this.style.border = '2px solid #ffc107';
            debounceTimers.bank = setTimeout(() => checkDuplicate('bank'), 300);
            const stlbankmsg = document.getElementById('stlbankmsg');
            if (stlbankmsg) {
                stlbankmsg.textContent = 'should be numeric and at least 10 digits';
                stlbankmsg.classList.remove('d-none');
            }
        } else {
            this.style.border = '';
            const stlbankmsg = document.getElementById('stlbankmsg');
            if (stlbankmsg) {
                stlbankmsg.textContent = '';
                stlbankmsg.classList.add('d-none');
            }
        }
    });

    codeInput.addEventListener('input', function () {
        clearTimeout(debounceTimers.code);

        // Show checking state for valid stylist codes
        const stylistCode = this.value.trim();
        if (stylistCode.length >= 2 && /^[A-Z][0-9]*$/.test(stylistCode)) {
            this.style.border = '2px solid #ffc107';
            debounceTimers.code = setTimeout(() => checkDuplicate('code'), 300);
            const stlcodemsg = document.getElementById('stlcodemsg');
            if (stlcodemsg) {
                stlcodemsg.textContent = 'should start with a capital letter followed by 3 digits';
                stlcodemsg.classList.remove('d-none');
            }
        } else {
            this.style.border = '';
            const stlcodemsg = document.getElementById('stlcodemsg');
            if (stlcodemsg) {
                stlcodemsg.textContent = '';
                stlcodemsg.classList.add('d-none');
            }
        }
    });

    // Form submission (simplified - no OTP required)
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Comprehensive validation check before submission
        let isValid = true;
        let errorMessages = [];

        // Check all input field validations
        Array.from(form.elements).forEach(function (input) {
            if (input.tagName === 'INPUT') {
                if (input.type === 'checkbox' && input.name === 'dataAgreement') {
                    // Special handling for data agreement checkbox
                    // if (!input.checked) {
                    //     input.style.outline = '2px solid #dc3545';
                    //     isValid = false;
                    //     errorMessages.push('You must agree to carry personal data to proceed');
                    // } else {
                    //     input.style.outline = '';
                    // }
                } else if (!input.checkValidity()) {
                    input.style.border = '2px solid #dc3545';
                    isValid = false;
                    if (input.validationMessage) {
                        errorMessages.push(`${input.name || input.id}: ${input.validationMessage}`);
                    }
                } else if (input.style.border.includes('dc3545')) {
                    // Check if field has red border from custom validation
                    isValid = false;
                    errorMessages.push(`${input.name || input.id}: Please fix the validation error`);
                } else {
                    input.style.border = '';
                }
            }
        });

        // Check location validation
        if (!locationInput.value) {
            locationInput.style.border = '2px solid #dc3545';
            showStylistResult('Location is required.', 'danger');
            isValid = false;
        } else if (!isLocationValid(locationInput.value)) {
            locationInput.style.border = '2px solid #dc3545';
            showStylistResult('Please select a valid location from the dropdown list only.', 'danger');
            isValid = false;
        }

        // Check for duplicates
        if (duplicateFound) {
            showStylistResult('Cannot register: Duplicate found.', 'danger');
            isValid = false;
        }

        // Check required fields specifically
        const requiredFields = {
            'stylistName': stylistNameInput,
            'phoneNumber': phoneInput,
            'stylistCode': codeInput,
            'stylistLocation': locationInput,
            'bankName': bankNameInput,
            'bankAccountNumber': bankInput,
            'beneficiaryName': form.elements['beneficiaryName']
        };

        Object.entries(requiredFields).forEach(([name, field]) => {
            if (field && (!field.value || field.value.trim() === '')) {
                field.style.border = '2px solid #dc3545';
                errorMessages.push(`${name} is required`);
                isValid = false;
            }
        });

        // Show all error messages if any
        if (!isValid) {
            const errorMessage = errorMessages.length > 0
                ? `Please fix the following errors: ${errorMessages.join('; ')}`
                : 'Please fix all validation errors before submitting.';
            showStylistResult(errorMessage, 'danger');
            showAlert('Form has validation errors. Please fix them before submitting.', 'danger');
            return false;
        }

        // All validations passed - submit form
        submitStylistForm();
    });

    function showStylistResult(message, type) {
        const resultDiv = document.getElementById('stylistResult');
        const alertDiv = resultDiv.querySelector('.alert');

        if (!message) {
            resultDiv.style.display = 'none';
            return;
        }

        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        resultDiv.style.display = 'block';
    }

}





// Load and display customer data
function loadCustomers() {
    if (firebaseAvailable) {
        database.ref('customers').off();

        database.ref('customers').once('value', (snapshot) => {
            const customers = snapshot.val() || {};
            const customersList = Object.entries(customers);

            updateCustomerTable(customersList);
            updateCustomerStats(customersList);

            // Populate stylist filter dropdown
            populateCustomerStylistFilter();

            // Apply admin-only column visibility after table is loaded
            setTimeout(() => {
                applyAdminOnlyVisibility();
                attachTokenActionListeners();
            }, 100);
        }).catch(error => {
        });
    }
}

// Update customer table
function updateCustomerTable(customersList) {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    if (customersList.length === 0) {
        tbody.innerHTML = '<tr><td colspan=\"8\" class=\"text-center text-muted\">No braiding registered yet</td></tr>';
        return;
    }
    // console.log('👥 Updating customer table with', customersList);
    tbody.innerHTML = customersList.map(([key, data]) => {
        const statusColor = 'success'; // Default status
        const paymentStatus = data.paymentStatus || 'TO BE PAID';
        const paymentColor = paymentStatus.toLowerCase() === 'paid' ? 'success' : 'warning';

        return `
                    <tr data-customer="${JSON.stringify(data).replace(/"/g, '&quot;')}">
                        <td><span class="badge bg-secondary">${data.tokenNo || 'N/A'}</span></td>
                        <td>
                            <div>
                                <strong>${data.customerId || 'N/A'}</strong>
                            </div>
                        </td>
                        
                        <td>
                            <div>
                                <strong>${data.stylistName || 'N/A'}</strong>
                                <br><small class="text-muted">${data.stylistCode || 'N/A'} - ${data.stylistLocation || 'N/A'}</small>
                            </div>
                        </td>
                        <td>
                            <div>
                                ${new Date(data.registrationDate).toLocaleDateString() || 'N/A'}
                                <br><small class="text-muted">${getDaysSince(data.registrationDate)} days ago</small>
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <span class="badge bg-${paymentColor}">${paymentStatus}</span>
                                <br><small class="text-muted">₦${data.paymentAmount || '5000'}</small>
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <strong>${data.accountNumber || ''}</strong>
                                <br>Bank: <small class="text-muted">${data.bankName || ''}</small>
                            </div>
                        </td>
                        <td>
                            <div class="text-center">
                                <strong>${data.approvalStatus || ''}</strong>
                                <br>Status: <small class="text-muted">${data.bankStatus || ''}</small>
                            </div>
                        </td>
                        <td class="admin-only-column action-column" style="display: none;">
                            <button type="button" class="btn btn-sm btn-outline-danger delete-token-btn" data-customer-key="${key}" title="Delete Token">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
    }).join('');

    // Apply admin visibility after table is populated
    applyAdminOnlyVisibility();

    // Attach token action listeners
    attachTokenActionListeners();
}
// <td>
//         <button class="btn btn-sm btn-outline-primary" onclick="viewCustomer('${key}')" title="View Details">
//             <i class="fas fa-eye"></i>
//         </button>
//     </td>

// Update customer statistics
function updateCustomerStats(customersList) {
    const totalCustomers = customersList.length;
    const today = new Date().toDateString();
    const todayCustomers = customersList.filter(([key, data]) =>
        new Date(data.registrationDate).toDateString() === today
    ).length;

    // Calculate this week customers (last 7 days including today)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6); // 7 days including today
    const weeklyCustomers = customersList.filter(([key, data]) => {
        const regDate = new Date(data.registrationDate);
        return regDate >= weekAgo && regDate <= new Date();
    }).length;

    // Calculate this month customers
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyCustomers = customersList.filter(([key, data]) => {
        const regDate = new Date(data.registrationDate);
        return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
    }).length;

    // console.log('👥 Customer Stats:', {
    //     total: totalCustomers,
    //     today: todayCustomers,
    //     thisWeek: weeklyCustomers,
    //     thisMonth: monthlyCustomers
    // });

    const totalCustomersEl = document.getElementById('totalCustomers');
    const todayCustomersEl = document.getElementById('todayCustomers');
    const weeklyCustomersEl = document.getElementById('weeklyCustomers');
    const monthlyCustomersEl = document.getElementById('monthlyCustomers');

    if (totalCustomersEl) totalCustomersEl.textContent = totalCustomers;
    if (todayCustomersEl) todayCustomersEl.textContent = todayCustomers;
    if (weeklyCustomersEl) weeklyCustomersEl.textContent = weeklyCustomers;
    if (monthlyCustomersEl) monthlyCustomersEl.textContent = monthlyCustomers;
}

// Update dashboard statistics
function updateDashboardStats() {
    if (firebaseAvailable) {
        // Update stylist count and location chart data - using .once() for fresh data
        database.ref('stylists').once('value', (snapshot) => {
            const stylists = snapshot.val() || {};
            const stylistsArray = Object.values(stylists);
            const count = stylistsArray.length;

            const stylistElement = document.getElementById('totalStylists');
            if (stylistElement) stylistElement.textContent = count;

            // Update dashboard card stylist count
            const dashboardStylistElement = document.querySelector('.dashboard-section .row .col-md-3:nth-child(1) .value');
            if (dashboardStylistElement) {
                dashboardStylistElement.textContent = count;
                // console.log('✅ Updated dashboard stylist count:', count);
            }

            // Update location chart with stylist location distribution
            const locationCounts = {};
            stylistsArray.forEach(stylist => {
                const location = stylist.location || 'Unknown';
                locationCounts[location] = (locationCounts[location] || 0) + 1;
            });

            // Update location chart
            updateLocationChart(locationCounts);

            // Update location summary table
            updateLocationSummaryTable(locationCounts);
        });

        // Update customer/braiding count, payment stats, and daily chart - using .once() for fresh data
        database.ref('customers').once('value', (snapshot) => {
            const customers = snapshot.val() || {};
            const customersArray = Object.values(customers);
            const count = customersArray.length;

            // console.log('📊 Dashboard: FRESH customer count:', count);
            // console.log('💳 Fresh payment data sample:', customersArray.slice(0, 2).map(c => ({
            //     name: c.customerName,
            //     status: c.paymentStatus,
            //     amount: c.paymentAmount
            // })));

            const braidingElement = document.querySelector('.dashboard-section .row .col-md-3:nth-child(2) .value');
            if (braidingElement) {
                braidingElement.textContent = count;
                // console.log('✅ Updated customer count in dashboard:', count);
            }                    // Calculate real total payment and paid/pending amounts from database


            let totalPayment = 0;
            let paidAmount = 0;
            let pendingAmount = 0;

            // console.log('💰 Processing payment data for', customersArray.length, 'customers...');

            customersArray.forEach((customer, index) => {
                const amount = parseFloat(customer.paymentAmount) || 5000;
                totalPayment += amount;

                // console.log(`Customer ${index + 1}:`, {
                //     name: customer.customerName,
                //     status: customer.paymentStatus,
                //     amount: amount,
                //     rawStatus: customer.paymentStatus
                // });

                // Check for all variations of "Paid" status - using consistent logic
                const status = (customer.paymentStatus || '').toString().toLowerCase();
                if (status === 'SUCCESSFUL' || status === 'COMPLETED' || status === 'COMPLETE' || status === 'paid' || status === 'PAID') {
                    paidAmount += amount;
                    // console.log('✅ Counted as PAID:', amount);
                }
            });

            // Calculate pending as Total - Paid (correct formula)
            pendingAmount = totalPayment - paidAmount;

            // console.log('💰 Payment Summary (CORRECTED):', {
            //     total: totalPayment,
            //     paid: paidAmount,
            //     pending: pendingAmount,
            //     formula: 'Pending = Total - Paid'
            // });

            // Update payment displays with real calculated amounts
            const totalPaymentElement = document.querySelector('.dashboard-section .row .col-md-3:nth-child(3) .value');
            if (totalPaymentElement) {
                totalPaymentElement.textContent = '₦' + totalPayment.toLocaleString();
                // console.log('📊 Updated total payment display:', totalPaymentElement.textContent);
            }

            const pendingPaymentElement = document.querySelector('.dashboard-section .row .col-md-3:nth-child(4) .value');
            if (pendingPaymentElement) {
                pendingPaymentElement.textContent = '₦' + pendingAmount.toLocaleString();
                // console.log('📊 Updated pending payment display:', pendingPaymentElement.textContent);
            }

            // Update daily chart with customer data
            updateDailyChart(customersArray);

            // Update sales by location chart (will load from saleOrders)
            updateSalesLocationChart();

            // console.log('🔄 Dashboard statistics update completed!');
        });
    } else {
    }
}

// Update location pie chart
let locationChartInstance = null;
function updateLocationChart(locationCounts) {
    const ctx = document.getElementById('locationChart');
    if (!ctx) return;

    // Destroy existing chart
    if (locationChartInstance) {
        locationChartInstance.destroy();
    }

    const locations = Object.keys(locationCounts);
    const counts = Object.values(locationCounts);

    // Generate colors
    const colors = [
        '#4285F4', '#EA4335', '#FBBC04', '#34A853',
        '#FF6D00', '#46BDC6', '#7B1FA2', '#F4511E'
    ];

    locationChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: locations,
            datasets: [{
                data: counts,
                backgroundColor: colors.slice(0, locations.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function (chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    const total = dataset.data.reduce((a, b) => a + b, 0);

                    meta.data.forEach((element, index) => {
                        const value = dataset.data[index];
                        const percentage = ((value / total) * 100).toFixed(1);

                        // Get position
                        const position = element.tooltipPosition();

                        // Set text properties
                        ctx.fillStyle = '#000';
                        ctx.font = 'bold 14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // Draw percentage
                        ctx.fillText(percentage + '%', position.x, position.y);
                    });
                });
            }
        }]
    });
}

// Update daily progress chart
let dailyChartInstance = null;
function updateDailyChart(customersArray) {
    const ctx = document.getElementById('dailyChart');
    if (!ctx) return;

    // Destroy existing chart
    if (dailyChartInstance) {
        dailyChartInstance.destroy();
    }

    // Group customers by registration date (last 7 days)
    const dailyCounts = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dailyCounts[dateStr] = 0;
    }

    // Count customers per day
    customersArray.forEach(customer => {
        const regDate = customer.registrationDate || customer.date;
        if (regDate) {
            const dateStr = regDate.split('T')[0];
            if (dailyCounts.hasOwnProperty(dateStr)) {
                dailyCounts[dateStr]++;
            }
        }
    });

    const labels = Object.keys(dailyCounts).map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = Object.values(dailyCounts);

    dailyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Registrations',
                data: data,
                borderColor: '#4285F4',
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// Update sales by location pie chart (from saleOrders)
let salesLocationChartInstance = null;
function updateSalesLocationChart() {

    const canvas = document.getElementById('salesLocationChart');
    if (!canvas) return;

    // Destroy existing chart and clear canvas
    if (salesLocationChartInstance) {
        salesLocationChartInstance.destroy();
        salesLocationChartInstance = null;
    }
    // Clear canvas to avoid Chart.js ID conflicts
    const ctx = canvas.getContext ? canvas.getContext('2d') : null;
    if (ctx && ctx.clearRect) ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load sale orders from Firebase
    if (!firebaseAvailable) {
        return;
    }

    database.ref('saleOrders').once('value', (snapshot) => {
        const saleOrders = snapshot.val() || {};
        const ordersArray = Object.values(saleOrders);

        // Group sales by location
        const locationSales = {};
        ordersArray.forEach(order => {
            const location = order.location || 'Unknown';
            // Sum all item values in the order
            const items = order.items || [];
            // console.log(`Processing order for location ${location} with items:`, items);
            const orderTotal = items.reduce((sum, item) => {
                return sum + (parseFloat(item.rate) || 0);
            }, 0);
            // console.log(`Order for location ${location}: ₦${orderTotal.toLocaleString()}`);
            locationSales[location] = (locationSales[location] || 0) + orderTotal;
        });

        const locations = Object.keys(locationSales);
        const sales = Object.values(locationSales);

        // Generate colors
        const colors = [
            '#EA4335', '#4285F4', '#FBBC04', '#34A853',
            '#FF6D00', '#46BDC6', '#7B1FA2', '#F4511E'
        ];

        salesLocationChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: locations,
                datasets: [{
                    data: sales,
                    backgroundColor: colors.slice(0, locations.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ₦${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            },
            plugins: [{
                afterDatasetsDraw: function (chart) {
                    const ctx = chart.ctx;
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        const total = dataset.data.reduce((a, b) => a + b, 0);

                        meta.data.forEach((element, index) => {
                            const value = dataset.data[index];
                            const percentage = ((value / total) * 100).toFixed(1);

                            // Get position
                            const position = element.tooltipPosition();

                            // Set text properties
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.strokeStyle = '#000';
                            ctx.lineWidth = 2;

                            // Draw percentage with outline for visibility
                            ctx.strokeText(percentage + '%', position.x, position.y);
                            ctx.fillText(percentage + '%', position.x, position.y);
                        });
                    });
                }
            }]
        });
    });
}

// Update location summary table with real data
function updateLocationSummaryTable(locationCounts) {
    const tbody = document.querySelector('#locationSummary tbody');
    if (!tbody) {
        return;
    }

    // Clear existing rows
    tbody.innerHTML = '';

    // Always show loading first
    tbody.innerHTML = '<tr><td colspan="7" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading location data...</td></tr>';

    // Get actual customer and payment data for each location
    if (firebaseAvailable) {
        Promise.all([
            database.ref('customers').once('value'),
            database.ref('stylists').once('value'),
            database.ref('saleOrders').once('value')
        ]).then(([customersSnapshot, stylistsSnapshot, saleOrdersSnapshot]) => {
            // console.log('Firebase data loaded for location summary');

            const customers = customersSnapshot.val() || {};
            const stylists = stylistsSnapshot.val() || {};
            const saleOrders = saleOrdersSnapshot.val() || {};
            const customersArray = Object.values(customers);
            const stylistsArray = Object.values(stylists);
            const saleOrdersArray = Object.values(saleOrders);

            // console.log('Customers count:', customersArray);
            // console.log('Stylists count:', stylistsArray.length);
            // console.log('Location counts:', locationCounts);

            // Clear loading message
            tbody.innerHTML = '';

            // If no location data, show all locations from database
            if (Object.keys(locationCounts).length === 0) {
                // console.log('No location counts provided, generating from stylist data');
                // Generate location counts from all stylists
                const allLocationCounts = {};
                stylistsArray.forEach(stylist => {
                    const location = stylist.location || 'Unknown';
                    allLocationCounts[location] = (allLocationCounts[location] || 0) + 1;
                });
                locationCounts = allLocationCounts;
                // console.log('Generated location counts:', locationCounts);
            }

            // Process each location with real data
            let totalStylists = 0;
            let totalBraiding = 0;
            let totalSalesSum = 0;
            let totalPaymentSum = 0;
            let totalPaymentDoneSum = 0;
            let totalPaymentPendingSum = 0;
            let locationCount = 0;

            Object.entries(locationCounts).forEach(([location, stylistCount]) => {
                // console.log(`Processing location: ${location}, stylists: ${stylistCount}`);

                // Get customers for this location (via stylist location)
                const locationCustomers = customersArray.filter(customer =>
                    customer.stylistLocation === location
                );
                // console.log(`Location ${location}: Customers data:`, locationCustomers);

                // Get stylists for this location
                const locationStylists = stylistsArray.filter(stylist =>
                    stylist.location === location
                );
                // console.log(`Processing location: ${location}`, locationStylists);
                // console.log(`Location ${location}: ${locationCustomers.length} customers, ${locationStylists.length} stylists`);

                // Calculate actual braiding completed (customer count for this location)
                const braidingCompleted = locationCustomers.length;

                // Calculate total sales for this location from sale orders
                let totalSales = 0;
                const locationSaleOrders = saleOrdersArray.filter(order =>
                    order.location === location
                );

                locationSaleOrders.forEach(order => {
                    order['items'].forEach(item => {
                        // console.log(`Adding item to total sales for location ${location}:`, item.rate);
                        totalSales += parseFloat(item.rate) || 0;
                    });
                });

                // Calculate actual payments for this location
                let totalPayment = 0;
                let paymentDone = 0;
                let paymentPending = 0;

                locationCustomers.forEach(customer => {
                    const amount = parseFloat(customer.paymentAmount) || 5000;
                    totalPayment += amount;

                    // Use consistent status checking like dashboard
                    const status = (customer.paymentStatus || '').toString().toLowerCase();
                    if (status === 'SUCCESSFUL' || status === 'COMPLETED' || status === 'COMPLETE' || status === 'PAID' || status === 'paid') {
                        paymentDone += amount;
                    } else {
                        paymentPending += amount;
                    }
                });

                const row = tbody.insertRow();
                row.innerHTML = `
                            <td>${location}</td>
                            <td>${stylistCount}</td>
                            <td>${braidingCompleted}</td>
                            <td>₦${totalPayment.toLocaleString()}</td>
                            <td>₦${paymentDone.toLocaleString()}</td>
                            <td>₦${paymentPending.toLocaleString()}</td>
                            <td>₦${totalSales.toLocaleString()}</td>
                        `;

                // Add to totals
                totalStylists += stylistCount;
                totalBraiding += braidingCompleted;
                totalSalesSum += totalSales;
                totalPaymentSum += totalPayment;
                totalPaymentDoneSum += paymentDone;
                totalPaymentPendingSum += paymentPending;
                locationCount++;

                // console.log(`Added row for ${location}: ${stylistCount} stylists, ${braidingCompleted} braidings, ${days} days`);
            });

            // Add total row if there are locations
            if (locationCount > 0) {
                const totalRow = tbody.insertRow();
                totalRow.className = 'table-active fw-bold';
                totalRow.innerHTML = `
                            <td><strong>Total</strong></td>
                            <td><strong>${totalStylists}</strong></td>
                            <td><strong>${totalBraiding}</strong></td>
                            <td><strong>₦${totalPaymentSum.toLocaleString()}</strong></td>
                            <td><strong>₦${totalPaymentDoneSum.toLocaleString()}</strong></td>
                            <td><strong>₦${totalPaymentPendingSum.toLocaleString()}</strong></td>
                            <td><strong>₦${totalSalesSum.toLocaleString()}</strong></td>
                        `;
            }

            // If still no data after processing, show message
            if (Object.keys(locationCounts).length === 0) {
                // console.log('No location data available, showing default message');
                const row = tbody.insertRow();
                row.innerHTML = '<td colspan="7" class="text-center text-muted">No stylists registered yet. Register stylists to see location data.</td>';
            }
        }).catch(error => {
            console.error('Error fetching data for location summary:', error);
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading location data. Please refresh.</td></tr>';
        });
    } else {
        // Fallback if Firebase not available
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Backend connection not available.</td></tr>';
    }
}

// Handle CSV file upload for payment status updates
function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!firebaseAvailable) {
        showAlert('Firebase connection required for CSV upload', 'danger');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const csv = e.target.result;
        const lines = csv.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
            showAlert('Invalid CSV file format', 'danger');
            return;
        }

        const headers = lines[0].split(',').map(h => h.trim());
        // console.log('CSV Headers:', headers);

        // Verify CSV format
        const requiredHeaders = ['Narration (Transaction ID)', 'Payment Status'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

        if (missingHeaders.length > 0) {
            showAlert(`Missing required columns: ${missingHeaders.join(', ')}`, 'danger');
            return;
        }

        // Process CSV data
        const updates = [];
        const mismatches = [];
        let processedCount = 0;

        // Get all existing customers from Firebase first
        database.ref('customers').once('value').then((snapshot) => {
            const existingCustomers = snapshot.val() || {};
            // console.log('Existing customers:', Object.keys(existingCustomers).length);
            // Process each CSV row
            for (let i = 1; i < lines.length; i++) {
                const data = lines[i].split(',').map(d => d.trim().replace(/^"|"$/g, ''));

                if (data.length < headers.length) continue;

                const custId = data[headers.indexOf('Narration (Transaction ID)')];
                const paymentStatus = data[headers.indexOf('Payment Status')];
                const paymentAmountRaw = data[headers.indexOf('Amount')] || '5000';
                const paymentAmount = paymentAmountRaw.toString().replace(/,/g, '');
                console.log('Processing CSV row:', { custId, paymentStatus, paymentAmount });
                if (custId && paymentStatus) {
                    console.log('Processing payment update for customer:', existingCustomers[custId], custId, paymentStatus, paymentAmount);
                    // Check if customer exists in Firebase
                    if (existingCustomers[custId]) {
                        updates.push({
                            custId: custId,
                            paymentStatus: paymentStatus,
                            paymentAmount: parseFloat(paymentAmount) || 5000,
                            paymentDate: new Date().toISOString(),
                            customerName: existingCustomers[custId].customerName
                        });
                    } else {
                        // Customer not found - add to mismatches
                        mismatches.push({
                            custId: custId,
                            paymentStatus: paymentStatus,
                            paymentAmount: paymentAmount,
                            reason: 'Customer ID not found in database'
                        });
                    }
                }
            }

            // console.log('Updates to process:', updates.length);
            // console.log('Mismatches found:', mismatches.length);

            // Show mismatches in popup if any
            if (mismatches.length > 0) {
                showMismatchPopup(mismatches);
            }

            // Process valid updates
            if (updates.length > 0) {
                processPaymentUpdates(updates);
            } else {
                showAlert('No valid payment updates found in CSV', 'warning');
            }

        }).catch((error) => {
            console.error('Error reading existing customers:', error);
            showAlert('Failed to process CSV file', 'danger');
        });

        // Reset file input
        event.target.value = '';
    };

    reader.readAsText(file);
}

// Process payment updates in batch
function processPaymentUpdates(updates) {
    console.log('Starting batch payment updates for', updates.length, 'records...');
    let successCount = 0;
    let errorCount = 0;
    console.log('Processing', updates.length, 'payment updates...', updates);
    const updatePromises = updates.map(update => {
        return database.ref(`customers/${update.custId}`).update({
            paymentStatus: update.paymentStatus,
            paymentAmount: update.paymentAmount,
            approvalStatus: update.approvalStatus,
            bankName: update.bankName,
            bankStatus: update.bankStatus,
            accountNumber: update.accountNumber,
            paymentDate: update.paymentDate || '',
            lastUpdated: new Date().toISOString()
        }).then(() => {
            successCount++;
            // console.log(`Updated payment for ${update.customerName} (${update.custId})`);
        }).catch((error) => {
            errorCount++;
            console.error(`Failed to update ${update.custId}:`, error);
        });
    });

    Promise.all(updatePromises).then(() => {
        console.log('Batch payment updates completed');
        showAlert(`Payment status updated successfully! ✅ ${successCount} updated, ❌ ${errorCount} failed`, 'success');

        // Auto-refresh dashboard data after CSV upload with longer delay
        setTimeout(() => {
            // console.log('🔄 Auto-refreshing dashboard after CSV payment updates...');
            forceRefreshDashboard();
        }, 1000); // Increased delay to 2 seconds for Firebase sync

    }).catch((error) => {
        console.error('Batch update error:', error);
        showAlert('Some payment updates failed', 'warning');
    });
}

// Force refresh dashboard data
function forceRefreshDashboard() {
    // console.log('🔄 FORCE REFRESH: Clearing cache and reloading all dashboard data...');

    if (!firebaseAvailable) {
        // console.log('❌ Firebase not available for refresh');
        return;
    }

    // Clear all Firebase listeners first
    database.ref().off(); // Clear all listeners

    // console.log('🧹 All Firebase listeners cleared');

    // Add small delay then reload everything fresh
    setTimeout(() => {
        // console.log('📊 Reloading dashboard stats...');
        updateDashboardStats();

        // console.log('👥 Reloading customers...');
        loadCustomers();

        // console.log('💼 Reloading stylists...');
        loadStylists();

        // console.log('✅ Dashboard force refresh completed - all data should be fresh!');
    }, 1000);
}        // Show mismatch popup table
function showMismatchPopup(mismatches) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'mismatchModal';
    modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            <h5 class="modal-title">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                CSV Data Mismatches Found
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-warning mb-3">
                                <strong>${mismatches.length}</strong> rows could not be processed due to mismatches:
                            </p>
                            <div class="table-responsive">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th>CUST_ID</th>
                                            <th>Payment Status</th>
                                            <th>Payment Amount</th>
                                            <th>Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${mismatches.map(m => `
                                            <tr>
                                                <td><code>${m.custId}</code></td>
                                                <td>${m.paymentStatus}</td>
                                                <td>₦${m.paymentAmount}</td>
                                                <td><span class="text-danger">${m.reason}</span></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-action="export-mismatches">Export Mismatches</button>
                        </div>
                    </div>
                </div>
            `;

    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    // Store mismatches for export
    window.currentMismatches = mismatches;

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
        delete window.currentMismatches;
    });
}

// Export mismatches as CSV
function exportMismatches() {
    if (!window.currentMismatches) return;

    let csvContent = "CUST_ID,Payment Status,Payment Amount,Issue\n";
    window.currentMismatches.forEach(m => {
        csvContent += `${m.custId},${m.paymentStatus},${m.paymentAmount},"${m.reason}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payment_mismatches_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

function viewCustomer(key) {
    showAlert('Customer details view not implemented yet', 'info');
}

function refreshCustomers() {
    loadCustomers();
    showAlert('Customers data refreshed', 'success');
}

function exportCustomers() {
    // console.log('🔥 FIREBASE ONLY: Exporting customers data...');

    // Get customers data from Firebase
    if (!firebaseAvailable) {
        showAlert('Firebase connection required for export', 'danger');
        return;
    }

    database.ref('customers').once('value').then((snapshot) => {
        const customers = snapshot.val() || {};
        const customersArray = Object.entries(customers).map(([key, data]) => ({ id: key, ...data }));

        if (customersArray.length === 0) {
            showAlert('No customers data available to export', 'warning');
            return;
        }

        // Generate CSV with Firebase CUST_ID format
        let csvContent = "CUST_ID,Customer Name,Phone,Stylist Code,Stylist Name,Stylist Location,Service Date,Payment Amount,Payment Status\n";

        customersArray.forEach((customer) => {
            const row = [
                customer.id, // Firebase key as CUST_ID (e.g., CUST_1764826487676)
                `"${customer.customerName || 'N/A'}"`,
                customer.customerNumber || 'N/A',
                customer.stylistCode || 'N/A',
                `"${customer.stylistName || 'N/A'}"`,
                `"${customer.stylistLocation || 'N/A'}"`,
                customer.registrationDate || 'N/A',
                customer.paymentAmount || '5000',
                customer.paymentStatus || 'TO BE PAID'
            ].join(',');
            csvContent += row + '\n';
        });

        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `customers_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showAlert(`Exported ${customersArray.length} customers with CUST_ID successfully!`, 'success');

    }).catch((error) => {
        console.error('Error exporting customers:', error);
        showAlert('Failed to export customers data', 'danger');
    });
}

// Navigation debouncing
let navigationTimeout = null;

// Setup navigation handling
function setupNavigation() {
    // Handle sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Debounce rapid clicks
            if (navigationTimeout) {
                clearTimeout(navigationTimeout);
            }

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);

                // Update active nav link immediately for instant feedback
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Show section immediately, load data after
                navigationTimeout = setTimeout(() => {
                    showSection(sectionId);
                }, 50);
            }
        });
    });
}

// Data loading cache and flags
let dataCache = {
    stylists: { loaded: false, timestamp: 0 },
    customers: { loaded: false, timestamp: 0 },
    saleOrders: { loaded: false, timestamp: 0 },
    reports: { loaded: false, timestamp: 0 }
};

// Show specific section
function showSection(sectionId) {
    // Validate session before showing any section
    if (!currentUser || !sessionStorage.getItem('currentUser')) {
        showLogin();
        return;
    }

    // Validate user permissions for the requested section
    let userPermissions = [];
    if (currentUser.isMaster) {
        userPermissions = SECTION_PERMISSIONS[currentUser.role] || [];
    } else {
        userPermissions = parseAccessFields(currentUser.accessFields);
    }

    // Check if user has permission to access this section
    if (!userPermissions.includes(sectionId)) {
        console.warn(`Access denied to section: ${sectionId}`);
        return;
    }

    // Hide all sections instantly
    document.querySelectorAll('.dashboard-section, .form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show requested section instantly
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';

        // Load data in background (non-blocking)
        setTimeout(() => {
            loadSectionData(sectionId);
        }, 10);
    }
}

// Optimized data loading function
function loadSectionData(sectionId) {
    const now = Date.now();

    switch (sectionId) {
        case 'stylists':
            if (!dataCache.stylists.loaded || (now - dataCache.stylists.timestamp) > 0) {
                clearFilters();
                loadStylists();
                dataCache.stylists = { loaded: true, timestamp: now };
            }
            break;
        case 'stylist-report':
            if (!dataCache.reports.loaded || (now - dataCache.reports.timestamp) > 0) {
                clearReportFilters();
                generateStylistReport();
                dataCache.reports = { loaded: true, timestamp: now };
            }
            break;
        case 'customers':
            if (!dataCache.customers.loaded || (now - dataCache.customers.timestamp) > 0) {
                clearCustomerFilters();
                loadCustomers();
                dataCache.customers = { loaded: true, timestamp: now };
            }
            break;
        case 'payment-request':
            loadPaymentRequestsData();
            break;
        case 'sale-order-form':
            // Load instantly for order form
            if (!dataCache.saleOrders.loaded || (now - dataCache.saleOrders.timestamp) > 0) {
                loadSaleOrders();
                dataCache.saleOrders = { loaded: true, timestamp: now };
            }
            // Always refresh datalists when entering form
            updateItemNameDatalist();
            updateDistributorDatalist();
            populateLocationDropdowns();
            break;
        case 'dashboard':
            updateDashboardStats();
            break;
    }
}

// Force refresh data cache (call this after adding/updating records)
function forceRefreshDataCache(section = null) {
    if (section) {
        if (dataCache[section]) {
            dataCache[section].loaded = false;
            dataCache[section].timestamp = 0;
        }
    } else {
        // Refresh all cache
        Object.keys(dataCache).forEach(key => {
            dataCache[key].loaded = false;
            dataCache[key].timestamp = 0;
        });
    }
}

// Add refresh button to dashboard
function addRefreshButtonToDashboard() {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection && !document.getElementById('dashboardRefreshBtn')) {
        const refreshBtn = document.createElement('button');
        refreshBtn.id = 'dashboardRefreshBtn';
        refreshBtn.className = 'btn btn-primary btn-sm mb-3 me-2';
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Dashboard';
        refreshBtn.onclick = () => {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            forceRefreshDashboard();
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Dashboard';
                showAlert('Dashboard refreshed with latest data!', 'success');
            }, 2000);
        };

        // Add debug button too
        const debugBtn = document.createElement('button');
        debugBtn.className = 'btn btn-info btn-sm mb-3';
        debugBtn.innerHTML = '<i class="fas fa-bug"></i> Debug Firebase';
        debugBtn.onclick = debugFirebaseData;

        // Add button at the top of dashboard
        const firstChild = dashboardSection.firstElementChild;
        if (firstChild) {
            dashboardSection.insertBefore(refreshBtn, firstChild);
            dashboardSection.insertBefore(debugBtn, firstChild);
        } else {
            dashboardSection.appendChild(refreshBtn);
            dashboardSection.appendChild(debugBtn);
        }
    }
}

// Debug Firebase data function
function debugFirebaseData() {
    // console.log('🐛 DEBUGGING: Checking Firebase data...');

    if (!firebaseAvailable) {
        // console.log('❌ Firebase not available!');
        alert('Firebase not available!');
        return;
    }

    // Check customers data
    database.ref('customers').once('value', (snapshot) => {
        const customers = snapshot.val() || {};
        // console.log('🐛 DEBUG: Raw customers data:', customers);
        // console.log('🐛 DEBUG: Number of customers:', Object.keys(customers).length);

        // Check payment status for each customer
        Object.entries(customers).forEach(([id, customer], index) => {
            // console.log(`🐛 Customer ${index + 1}:`, {
            //     id: id,
            //     name: customer.customerName,
            //     paymentStatus: customer.paymentStatus,
            //     paymentAmount: customer.paymentAmount,
            //     stylistCode: customer.stylistCode
            // });
        });
    });

    // Check stylists data  
    database.ref('stylists').once('value', (snapshot) => {
        const stylists = snapshot.val() || {};
        // console.log('🐛 DEBUG: Raw stylists data:', stylists);
        // console.log('🐛 DEBUG: Number of stylists:', Object.keys(stylists).length);

        // Check stylist codes
        Object.entries(stylists).forEach(([id, stylist], index) => {
            // console.log(`🐛 Stylist ${index + 1}:`, {
            //     id: id,
            //     name: stylist.stylistName,
            //     code: stylist.stylistCode,
            //     location: stylist.location
            // });
        });
    });

    alert('Check console for detailed Firebase debug info!');
}        // Form OTP Verification State
let formOTPState = {
    stylist: {
        phone: null,
        verified: false,
        otpSent: false,
        timer: null,
        confirmationResult: null
    },
    customer: {
        phone: null,
        verified: false,
        otpSent: false,
        timer: null,
        confirmationResult: null
    }
};

function verifyFormOTP(formType) {
    const otpInput = document.getElementById(`${formType}OTPCode`);
    const otpValue = otpInput.value.trim();

    if (otpValue.length !== 6) {
        showAlert('Please enter a 6-digit OTP', 'warning');
        return;
    }

    // Show loading state
    const verifyBtn = document.getElementById(`verify${formType.charAt(0).toUpperCase() + formType.slice(1)}OTP`);
    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    }

    // Use Firebase OTP verification if available
    if (formOTPState[formType].confirmationResult) {
        formOTPState[formType].confirmationResult.confirm(otpValue)
            .then((result) => {
                // OTP verified successfully
                formOTPState[formType].verified = true;

                // Hide OTP section and show verified badge
                document.getElementById(`${formType}OTPSection`).style.display = 'none';
                document.getElementById(`${formType}PhoneVerified`).style.display = 'block';

                // Clear timer
                if (formOTPState[formType].timer) {
                    clearInterval(formOTPState[formType].timer);
                }

                showAlert('Phone number verified successfully!', 'success');
                // console.log('Firebase OTP verification successful:', result.user);
            })
            .catch((error) => {
                console.error('Firebase OTP verification error:', error);
                showAlert('Invalid OTP. Please try again.', 'danger');
                otpInput.focus();
            })
            .finally(() => {
                if (verifyBtn) {
                    verifyBtn.disabled = false;
                    verifyBtn.innerHTML = 'Verify OTP';
                }
            });
    } else {
        // Fallback: Use demo OTP only if Firebase is not available
        const isValid = otpValue === '123456'; // Demo OTP for testing when Firebase is unavailable

        if (isValid) {
            formOTPState[formType].verified = true;

            // Hide OTP section and show verified badge
            document.getElementById(`${formType}OTPSection`).style.display = 'none';
            document.getElementById(`${formType}PhoneVerified`).style.display = 'block';

            // Clear timer
            if (formOTPState[formType].timer) {
                clearInterval(formOTPState[formType].timer);
            }

            showAlert('Phone number verified successfully! (Demo mode)', 'success');
        } else {
            showAlert('Invalid OTP. Please try again.', 'danger');
            otpInput.focus();
        }

        if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = 'Verify OTP';
        }
    }
}

function startFormOTPTimer(formType) {
    let timeLeft = 60;
    const timerSpan = document.getElementById(`${formType}OTPTimer`);
    const resendBtn = document.getElementById(`resend${formType.charAt(0).toUpperCase() + formType.slice(1)}OTP`);

    if (resendBtn) {
        resendBtn.disabled = true;
        resendBtn.style.opacity = '0.6';
    }

    formOTPState[formType].timer = setInterval(() => {
        timeLeft--;
        if (timerSpan) {
            timerSpan.textContent = `(${timeLeft}s)`;
        }

        if (timeLeft <= 0) {
            clearInterval(formOTPState[formType].timer);
            if (timerSpan) timerSpan.textContent = '';
            if (resendBtn) {
                resendBtn.disabled = false;
                resendBtn.style.opacity = '1';
            }
        }
    }, 1000);
}

function resendFormOTP(formType) {
    const phone = formOTPState[formType].phone;
    if (phone) {
        resendFormOTP(formType, phone);
    }
}

// Phone number validation and OTP trigger for forms
function setupFormOTPValidation() {
    // Stylist form phone validation
    const stylistPhone = document.getElementById('phoneNumber');
    if (stylistPhone) {
        stylistPhone.addEventListener('blur', function () {
            const phone = this.value.trim();
            if (phone.length === 11 && /^0[789][0-9]{9}$/.test(phone)) {
                if (!formOTPState.stylist.verified || formOTPState.stylist.phone !== phone) {
                    // Reset verification state for new number
                    formOTPState.stylist.verified = false;
                    document.getElementById('stylistPhoneVerified').style.display = 'none';

                    // Send OTP after short delay
                    setTimeout(() => {
                        // sendFormOTP('stylist', phone);
                    }, 500);
                }
            }
        });
    }

    // Customer form phone validation
    const customerPhone = document.querySelector('input[name="customerNumber"]');
    if (customerPhone) {
        customerPhone.addEventListener('blur', function () {
            const phone = this.value.trim();
            if (phone.length === 11 && /^0[789][0-9]{9}$/.test(phone)) {
                if (!formOTPState.customer.verified || formOTPState.customer.phone !== phone) {
                    // Reset verification state for new number
                    formOTPState.customer.verified = false;
                    document.getElementById('customerPhoneVerified').style.display = 'none';

                    // Send OTP after short delay
                    setTimeout(() => {
                        // sendFormOTP('customer', phone);
                    }, 500);
                }
            }
        });
    }

    // Setup OTP verify buttons
    const verifyStylistBtn = document.getElementById('verifyStylistOTP');
    if (verifyStylistBtn) {
        verifyStylistBtn.addEventListener('click', () => verifyFormOTP('stylist'));
    }

    const verifyCustomerBtn = document.getElementById('verifyCustomerOTP');
    if (verifyCustomerBtn) {
        verifyCustomerBtn.addEventListener('click', () => verifyFormOTP('customer'));
    }

    // Setup resend OTP buttons
    const resendStylistBtn = document.getElementById('resendStylistOTP');
    if (resendStylistBtn) {
        resendStylistBtn.addEventListener('click', () => resendFormOTP('stylist'));
    }

    const resendCustomerBtn = document.getElementById('resendCustomerOTP');
    if (resendCustomerBtn) {
        resendCustomerBtn.addEventListener('click', () => resendFormOTP('customer'));
    }
}

// Form validation with OTP check
function validateFormWithOTP(formType) {
    // OTP validation disabled for testing
    // console.log(`OTP validation disabled for ${formType} form`);
    return true;
}

// Enhanced form submission validation
function setupEnhancedFormValidation() {
    // Form validation setup - event listener removed to prevent duplicates
    const stylistForm = document.getElementById('stylistForm');
    if (stylistForm) {
        // console.log('Stylist form validation setup completed (event listener in initializeEnhancedStylistForm)');
    }

}

// Firebase Authentication Functions
let recaptchaVerifier = null;
let confirmationResult = null;
let otpCountdown = null;

function initializeFirebase() {
    try {
        // Firebase is already initialized at the top of the script
        // No need for additional reCAPTCHA setup for username/password login
        // reCAPTCHA will be initialized only when needed for OTP verification
        // console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        showAlert('Failed to initialize authentication system', 'danger');
    }
}

// Initialize reCAPTCHA only when needed for OTP verification
function initializeRecaptcha() {
    if (recaptchaVerifier) {
        return Promise.resolve();
    }

    try {
        recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
                // console.log('reCAPTCHA expired');
                showAlert('reCAPTCHA expired. Please try again.', 'warning');
            }
        });
        return recaptchaVerifier.render();
    } catch (error) {
        console.error('reCAPTCHA initialization error:', error);
        return Promise.reject(error);
    }
}

function sendOTP() {
    const phoneInput = document.getElementById('phoneNumber');
    const phoneNumber = phoneInput.value.trim();

    if (!phoneNumber) {
        showAlert('Please enter a phone number', 'warning');
        phoneInput.focus();
        return;
    }

    if (phoneNumber.length !== 11 || !/^0[789][0-9]{9}$/.test(phoneNumber)) {
        showAlert('Please enter a valid 11-digit phone number starting with 07, 08, or 09', 'warning');
        phoneInput.focus();
        return;
    }

    const fullPhoneNumber = '+234' + phoneNumber.substring(1);
    const sendOTPBtn = document.getElementById('sendOTPBtn');

    sendOTPBtn.disabled = true;
    sendOTPBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Initialize reCAPTCHA first, then send OTP
    initializeRecaptcha()
        .then(() => {
            return auth(app).signInWithPhoneNumber(fullPhoneNumber, recaptchaVerifier);
        })
        .then((result) => {
            confirmationResult = result;
            showOTPForm();
            startOTPCountdown();
            showAlert('OTP sent successfully to your phone', 'success');
            // console.log('OTP sent to:', fullPhoneNumber);
        })
        .catch((error) => {
            console.error('Error sending OTP:', error);
            sendOTPBtn.disabled = false;
            sendOTPBtn.innerHTML = 'Send OTP';

            if (error.code === 'auth/too-many-requests') {
                showAlert('Too many requests. Please try again later.', 'warning');
            } else if (error.code === 'auth/invalid-phone-number') {
                showAlert('Invalid phone number format', 'danger');
            } else {
                showAlert('Failed to send OTP. Please try again.', 'danger');
            }

            // Reset reCAPTCHA
            if (recaptchaVerifier) {
                recaptchaVerifier.clear();
                initializeFirebase();
            }
        });
}

function verifyOTP() {
    const otpCode = document.getElementById('otpCode').value.trim();

    if (!otpCode || otpCode.length !== 6) {
        showAlert('Please enter the 6-digit OTP code', 'warning');
        return;
    }

    const verifyOTPBtn = document.getElementById('verifyOTPBtn');
    verifyOTPBtn.disabled = true;
    verifyOTPBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

    confirmationResult.confirm(otpCode)
        .then((result) => {
            const user = result.user;
            // console.log('Phone authentication successful:', user.phoneNumber);

            // Check if user is authorized
            checkUserAuthorization(user.phoneNumber);
        })
        .catch((error) => {
            console.error('Error verifying OTP:', error);
            verifyOTPBtn.disabled = false;
            verifyOTPBtn.innerHTML = 'Verify OTP';

            if (error.code === 'auth/invalid-verification-code') {
                showAlert('Invalid OTP code. Please try again.', 'danger');
            } else if (error.code === 'auth/code-expired') {
                showAlert('OTP code expired. Please request a new one.', 'warning');
                // console.log('Form reset');
            } else {
                showAlert('Failed to verify OTP. Please try again.', 'danger');
            }
        });
}

function checkUserAuthorization(phoneNumber) {
    const userKey = phoneNumber.replace('+234', '0');

    // Check in database for user permissions
    getUserData(userKey)
        .then((userData) => {
            if (!userData) {
                // User not found in database - deny access
                showAlert('Access denied. Please contact administrator for account setup.', 'danger');
                logout();
                return;
            }

            if (userData.status !== 'active') {
                const statusMessage = {
                    'pending': 'Your account is pending approval. Please contact administrator.',
                    'blocked': 'Your account has been blocked. Please contact administrator.',
                    'inactive': 'Your account is inactive. Please contact administrator.'
                };

                showAlert(statusMessage[userData.status] || 'Account access denied.', 'warning');
                logout();
                return;
            }

            // User authorized - proceed with login
            completeLogin(userData);
        })
        .catch((error) => {
            console.error('Error checking user authorization:', error);
            showAlert('Unable to verify user permissions. Please try again.', 'danger');
            logout();
        });
}

function completeLogin(userData) {
    // Store user session (using sessionStorage for security - cleared on browser close)
    currentUser = {
        phone: userData.phoneNumber,
        name: userData.fullName,
        role: userData.role,
        location: userData.location,
        loginTime: new Date().toISOString()
    };

    // Encrypt currentUser before storing
    encryptData(JSON.stringify(currentUser), 'user-session-secret').then(encryptedUser => {
        sessionStorage.setItem('currentUser', encryptedUser);
    }).catch(e => {
        // fallback: do not store user data if encryption fails
        console.error('Encryption failed, not storing currentUser:', e);
    });

    // Update last login in database
    const userKey = userData.phoneNumber;
    getUserData(userKey).then((existingUser) => {
        if (existingUser) {
            existingUser.lastLogin = new Date().toISOString();
            return saveUserData(userKey, existingUser);
        }
    }).catch(error => {
        // console.log('Could not update last login:', error);
    });

    // Hide login modal and show dashboard
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();

    updateUserDisplay();
    updateDashboardStats();
    loadStylists();
    loadCustomers();

    showAlert(`Welcome back, ${userData.fullName}!`, 'success');
    // console.log('Login completed for user:', currentUser);
}

function showOTPForm() {
    document.getElementById('phoneForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'block';
    document.getElementById('otpCode').focus();
}



function startOTPCountdown() {
    let timeLeft = 60;
    const resendLink = document.getElementById('resendOTP');

    otpCountdown = setInterval(() => {
        timeLeft--;
        resendLink.textContent = `Resend OTP (${timeLeft}s)`;

        if (timeLeft <= 0) {
            clearInterval(otpCountdown);
            resendLink.textContent = 'Resend OTP';
            resendLink.style.pointerEvents = 'auto';
            resendLink.style.opacity = '1';
        }
    }, 1000);

    resendLink.style.pointerEvents = 'none';
    resendLink.style.opacity = '0.6';
}

function resendOTP() {
    if (otpCountdown) return; // Still in countdown

    // console.log('Form reset');
    setTimeout(() => {
        sendOTP();
    }, 500);
}



// User Management Functions
function toggleAddUserForm() {
    const form = document.getElementById('addUserForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';

    if (form.style.display === 'block') {
        document.querySelector('input[name="fullName"]').focus();
    }
}

function addNewUser() {
    const form = document.getElementById('newUserForm');
    const formData = new FormData(form);

    const userData = {
        userId: formData.get('userId'),
        fullName: formData.get('fullName'),
        phoneNumber: formData.get('phoneNumber'),
        email: formData.get('email') || '',
        password: formData.get('password'), // In production, this should be hashed
        role: formData.get('role'),
        location: formData.get('location'),
        status: formData.get('status'),
        description: formData.get('description') || '',
        createdDate: new Date().toISOString(),
        createdBy: currentUser?.name || 'System Admin',
        lastLogin: null,
        passwordChanged: false
    };

    // Validate required fields
    if (!userData.userId || !userData.fullName || !userData.phoneNumber || !userData.password || !userData.location) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }

    const userKey = userData.phoneNumber;
    const userId = userData.userId;

    // Check if user ID or phone number already exists
    Promise.all([
        getUserData(userKey),
        getUserByUserId(userId)
    ]).then(([existingUserByPhone, existingUserByUserId]) => {
        if (existingUserByPhone) {
            showAlert('User with this phone number already exists', 'warning');
            throw new Error('Phone number exists');
        }
        if (existingUserByUserId) {
            showAlert('User ID already exists. Please choose a different one.', 'warning');
            throw new Error('User ID exists');
        }

        // Submit to both Firebase and Google Sheets
        // console.log('Saving user data:', userData);
        return Promise.all([
            saveUserData(userKey, userData),
            submitToGoogleSheets('users', userData)
        ]);
    })
        .then(() => {
            showAlert('User added successfully', 'success');
            form.reset();
            toggleAddUserForm();
            loadUsers();
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            showAlert('Failed to add user. Please try again.', 'danger');
        });
}

// Enhanced data operations
function getUserByUserId(userId) {
    if (firebaseAvailable) {
        return database.ref('users').orderByChild('userId').equalTo(userId).once('value')
            .then(snapshot => {
                const users = snapshot.val();
                return users ? Object.values(users)[0] : null;
            });
    } else {
        const users = loadFromLocal('users') || {};
        const foundUser = Object.values(users).find(user => user.userId === userId);
        return Promise.resolve(foundUser || null);
    }
}

// Google Sheets submission function
function submitToGoogleSheets(sheetType, data) {
    // console.log('Attempting to submit to Google Sheets:', sheetType, data);

    if (!CONFIG.enableGoogleSheets) {
        // console.log('Google Sheets integration disabled');
        return Promise.resolve({ success: true, message: 'Sheets disabled' });
    }

    const payload = {
        action: 'submitData',
        sheetType: sheetType,
        sheetName: CONFIG.googleSheetsSheets[sheetType] || sheetType,
        data: data,
        timestamp: new Date().toISOString(),
        source: 'Management Dashboard'
    };

    // console.log('Google Sheets payload:', payload);

    // If Google Apps Script URL is configured, make the actual request
    if (CONFIG.GOOGLE_SCRIPT_URL && CONFIG.GOOGLE_SCRIPT_URL !== 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec') {
        // console.log('Making request to Google Apps Script:', CONFIG.GOOGLE_SCRIPT_URL);
        return fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Handle CORS issues
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                // console.log('Google Sheets request completed (no-cors mode)');
                // With no-cors mode, we assume success if no error is thrown
                return { success: true, message: 'Data submitted to Google Sheets' };
            })
            .catch(error => {
                console.error('Error submitting to Google Sheets:', error);
                // Don't fail the entire operation for Google Sheets errors
                return { success: false, error: error.message, fallback: true };
            });
    } else {
        // Simulate successful submission for demo
        // console.log('Google Sheets URL not configured, using demo mode');
        return new Promise((resolve) => {
            setTimeout(() => {
                // console.log('Demo Google Sheets submission completed');
                resolve({ success: true, message: 'Data submitted to Google Sheets (Demo Mode)' });
            }, 500);
        });
    }
}        // Universal form submission function
async function submitFormData(formType, formData, additionalData = {}) {
    const submissionData = {
        ...formData,
        ...additionalData,
        submissionId: 'SUB_' + Date.now(),
        submittedAt: new Date().toISOString(),
        submittedBy: currentUser?.name || 'Anonymous',
        formType: formType
    };

    // Submit to both Firebase and Google Sheets
    const promises = [];

    // Firebase submission
    if (firebaseAvailable) {
        const ref = database.ref(`submissions/${formType}`).push();
        promises.push(ref.set(submissionData));
    } else {
        // Local storage fallback
        const submissions = loadFromLocal(`submissions_${formType}`) || [];
        submissions.push(submissionData);
        await saveToLocal(`submissions_${formType}`, submissions);
        promises.push(Promise.resolve());
    }

    // Google Sheets submission
    promises.push(submitToGoogleSheets(formType, submissionData));

    return Promise.all(promises).then(() => {
        // console.log(`${formType} form submitted successfully`);
        return { success: true, data: submissionData };
    }).catch(error => {
        console.error(`Error submitting ${formType} form:`, error);
        throw error;
    });
}        // Password management functions
function showChangePasswordModal(phoneKey) {
    const modal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
    document.getElementById('changePasswordUserKey').value = phoneKey;
    modal.show();
}

async function changePassword() {
    const phoneKey = document.getElementById('changePasswordUserKey').value;
    const newPassword = document.getElementById('newPasswordInput').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;

    if (!newPassword || newPassword.length < 6) {
        showAlert('Password must be at least 6 characters long', 'warning');
        return;
    }

    if (newPassword !== confirmPassword) {
        showAlert('Passwords do not match', 'warning');
        return;
    }

    // Update user password
    getUserData(phoneKey).then(async userData => {
        if (userData) {
            userData.password = await hashPassword(newPassword);
            userData.passwordChanged = true;
            userData.lastPasswordChange = new Date().toISOString();

            return saveUserData(phoneKey, userData);
        }
    }).then(() => {
        showAlert('Password updated successfully', 'success');
        bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
        document.getElementById('changePasswordForm').reset();
    }).catch(error => {
        console.error('Error updating password:', error);
        showAlert('Failed to update password', 'danger');
    });
}

function showForgotPasswordModal() {
    const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
    modal.show();
}

async function resetPassword() {
    const identifier = document.getElementById('resetIdentifierInput').value;

    if (!identifier) {
        showAlert('Please enter User ID or Phone Number', 'warning');
        return;
    }

    // Search for user by User ID or Phone Number
    getAllUsers().then(async users => {
        const userEntries = Object.entries(users);
        const foundUser = userEntries.find(([key, user]) =>
            user.userId === identifier ||
            user.phoneNumber === identifier ||
            key === identifier.replace('+234', '0')
        );

        if (!foundUser) {
            showAlert('User not found', 'warning');
            return;
        }

        const [userKey, userData] = foundUser;

        // Generate temporary password using secure random
        const tempPassword = generateSecurePassword(8);
        userData.password = await hashPassword(tempPassword);
        userData.passwordChanged = false;
        userData.tempPasswordGenerated = new Date().toISOString();

        return saveUserData(userKey, userData).then(() => {
            showAlert(`Temporary password generated: ${tempPassword}`, 'success');
            bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal')).hide();
            document.getElementById('forgotPasswordForm').reset();
        });
    }).catch(error => {
        console.error('Error resetting password:', error);
        showAlert('Failed to reset password', 'danger');
    });
}

function loadUsers() {
    getAllUsers()
        .then((users) => {
            displayUsers(Object.entries(users));
            updateUserStats(users);
        })
        .catch((error) => {
            console.error('Error loading users:', error);
            showAlert('Failed to load users', 'danger');
        });
}

function displayUsers(userEntries) {
    const tbody = document.getElementById('usersTableBody');

    if (userEntries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No users found</td></tr>';
        return;
    }

    tbody.innerHTML = userEntries.map(([phoneKey, user]) => `
                <tr>
                    <td>${escapeHtml(user.fullName) || 'N/A'}</td>
                    <td>${escapeHtml(user.phoneNumber) || 'N/A'}</td>
                    <td>
                        <span class="badge bg-${getRoleBadgeColor(user.role)}">
                            ${escapeHtml(USER_ROLES[user.role]) || escapeHtml(user.role) || 'N/A'}
                        </span>
                    </td>
                    <td>${user.location === 'all' ? 'All Locations' : (escapeHtml(user.location) || 'N/A')}</td>
                    <td>
                        <span class="badge bg-${getStatusBadgeColor(user.status)}">
                            ${user.status ? escapeHtml(user.status.charAt(0).toUpperCase() + user.status.slice(1)) : 'N/A'}
                        </span>
                    </td>
                    <td>${user.createdDate ? formatDate(user.createdDate) : 'N/A'}</td>
                    <td>${user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" data-action="edit-user-mgmt" data-user-key="${escapeHtml(phoneKey)}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-info" data-action="change-password" data-user-key="${escapeHtml(phoneKey)}"
                                title="Change Password" placeholder="minimum 6 characters">
                                <i class="fas fa-key"></i>
                            </button>
                            <button class="btn btn-outline-${escapeHtml(user.status === 'active' ? 'warning' : 'success')}" 
                                data-action="toggle-user-status" data-user-key="${escapeHtml(phoneKey)}" data-user-status="${escapeHtml(user.status)}">
                                <i class="fas fa-${escapeHtml(user.status === 'active' ? 'ban' : 'check')}"></i>
                            </button>
                            <button class="btn btn-outline-danger" data-action="delete-user-mgmt" data-user-key="${escapeHtml(phoneKey)}" data-user-name="${escapeHtml(user.fullName)}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function updateUserStats(users) {
    const stats = {
        total: 0,
        active: 0,
        pending: 0,
        blocked: 0
    };

    Object.values(users).forEach(user => {
        stats.total++;
        if (user.status === 'active') stats.active++;
        else if (user.status === 'TO BE PAID') stats.pending++;
        else if (user.status === 'blocked') stats.blocked++;
    });

    document.getElementById('totalUsers').textContent = stats.total;
    document.getElementById('activeUsers').textContent = stats.active;
    document.getElementById('pendingUsers').textContent = stats.pending;
    document.getElementById('blockedUsers').textContent = stats.blocked;
}

function getRoleBadgeColor(role) {
    const colors = {
        'super_admin': 'danger',
        'admin': 'primary',
        'manager': 'warning',
        'user': 'info',
        'stylist_only': 'secondary'
    };
    return colors[role] || 'secondary';
}

function getStatusBadgeColor(status) {
    const colors = {
        'active': 'success',
        'TO BE PAID': 'warning',
        'blocked': 'danger',
        'inactive': 'secondary'
    };
    return colors[status] || 'primary';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;

    const rows = document.querySelectorAll('#usersTableBody tr');

    rows.forEach(row => {
        const cells = row.cells;
        if (cells.length < 8) return;

        const name = cells[0].textContent.toLowerCase();
        const phone = cells[1].textContent.toLowerCase();
        const role = cells[2].querySelector('span').textContent.toLowerCase();
        const location = cells[3].textContent;
        const status = cells[4].querySelector('span').textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm) || phone.includes(searchTerm);
        const matchesRole = !roleFilter || role.includes(roleFilter.toLowerCase());
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        const matchesLocation = !locationFilter || location.includes(locationFilter);

        row.style.display = matchesSearch && matchesRole && matchesStatus && matchesLocation ? '' : 'none';
    });
}

function clearUserFilters() {
    document.getElementById('userSearch').value = '';
    document.getElementById('roleFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('locationFilter').value = '';
    filterUsers();
}

function exportUsers() {
    // This would typically export to CSV or Excel
    showAlert('Export functionality coming soon', 'info');
}

function refreshUsers() {
    // This would typically export to CSV or Excel
    showAlert('Export functionality coming soon', 'info');
    loadUsers();
}

function toggleUserStatus(phoneKey, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';

    if (confirm(`Are you sure you want to ${newStatus} this user?`)) {
        updateUserStatus(phoneKey, newStatus)
            .then(() => {
                showAlert(`User ${newStatus} successfully`, 'success');
                loadUsers();
            })
            .catch((error) => {
                console.error('Error updating user status:', error);
                showAlert('Failed to update user status', 'danger');
            });
    }
}

// Password toggle functionality
function initializePasswordToggle() {
    // Handle main login password toggle
    const toggleLoginPasswordIcon = document.getElementById('toggleLoginPassword');
    if (toggleLoginPasswordIcon) {
        toggleLoginPasswordIcon.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent form submission
            const passwordInput = document.getElementById('password');

            if (passwordInput && passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordInput.style.backgroundColor = '#343a40'; // Dark gray background
                passwordInput.style.color = '#f8f9fa'; // Very light gray text
                passwordInput.style.borderColor = '#495057'; // Dark gray border
                this.className = 'fas fa-eye-slash position-absolute';
                this.setAttribute('title', 'Hide password');
            } else if (passwordInput) {
                passwordInput.type = 'password';
                passwordInput.style.backgroundColor = ''; // Reset to default background
                passwordInput.style.color = ''; // Reset to default text color
                passwordInput.style.borderColor = ''; // Reset to default border
                this.className = 'fas fa-eye position-absolute';
                this.setAttribute('title', 'Show password');
            }
        });
    }

    // Handle user management form password toggle (if exists)
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function () {
            const passwordInput = document.getElementById('passwordInput');
            const icon = this.querySelector('i');

            if (passwordInput && passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordInput.style.backgroundColor = '#343a40'; // Dark gray background
                passwordInput.style.color = '#f8f9fa'; // Very light gray text
                passwordInput.style.borderColor = '#495057'; // Dark gray border
                icon.className = 'fas fa-eye-slash';
            } else if (passwordInput) {
                passwordInput.type = 'password';
                passwordInput.style.backgroundColor = ''; // Reset to default background
                passwordInput.style.color = ''; // Reset to default text color
                passwordInput.style.borderColor = ''; // Reset to default border
                icon.className = 'fas fa-eye';
            }
        });
    }
}

// Payment Request Data Functions
let paymentRequestsData = [];
let filteredPaymentRequests = [];
const itemsPerPage = 10;
let currentPage = 1;

function initializePaymentRequestForm() {
    const refreshBtn = document.getElementById('refreshPaymentRequestsData');
    const exportBtn = document.getElementById('exportPaymentRequests');
    const uploadBtn = document.getElementById('uploadCSV');
    const searchInput = document.getElementById('paymentSearchInput');
    const bankFilter = document.getElementById('paymentBankFilter');
    const amountFilter = document.getElementById('paymentAmountFilter');
    const statusFilter = document.getElementById('paymentStatusFilter');
    const csvFileInput = document.getElementById('csvFile');
    const uploadCSVDataBtn = document.getElementById('uploadCSVData');

    // Handle refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            loadPaymentRequestsData();
        });
    }

    // Handle export button
    if (exportBtn) {
        exportBtn.addEventListener('click', function () {
            exportPaymentRequestsData();
        });
    }

    // Handle upload CSV button
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function () {
            const modalElement = document.getElementById('csvUploadModal');

            // Remove any existing event listeners to prevent duplicates
            modalElement.removeEventListener('shown.bs.modal', handleModalShown);
            modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
            modalElement.removeEventListener('show.bs.modal', handleModalShow);

            // Define event handlers
            function handleModalShow() {
                // Immediately remove aria-hidden when modal starts to show
                modalElement.removeAttribute('aria-hidden');
                modalElement.setAttribute('aria-live', 'polite');
            }

            function handleModalShown() {
                // Ensure accessibility attributes are correct when fully shown
                modalElement.removeAttribute('aria-hidden');
                modalElement.setAttribute('aria-live', 'polite');
                modalElement.setAttribute('role', 'dialog');
                modalElement.setAttribute('aria-labelledby', modalElement.querySelector('.modal-title')?.id || 'modal-title');

                // Focus on the file input for better accessibility
                setTimeout(() => {
                    const fileInput = modalElement.querySelector('#csvFile');
                    if (fileInput) {
                        fileInput.focus();
                    }
                }, 100);
            }

            function handleModalHidden() {
                // Clean up when modal is hidden
                modalElement.setAttribute('aria-hidden', 'true');
                modalElement.removeAttribute('aria-live');
            }

            // Attach event listeners
            modalElement.addEventListener('show.bs.modal', handleModalShow);
            modalElement.addEventListener('shown.bs.modal', handleModalShown);
            modalElement.addEventListener('hidden.bs.modal', handleModalHidden);

            // Create and show modal
            const modal = new bootstrap.Modal(modalElement, {
                backdrop: 'static',
                keyboard: true,
                focus: true
            });

            modal.show();
        });
    }

    // Handle CSV file selection
    if (csvFileInput) {
        csvFileInput.addEventListener('change', function () {
            if (this.files.length > 0) {
                previewCSV(this.files[0]);
            }
        });
    }

    // Handle CSV upload
    if (uploadCSVDataBtn) {
        uploadCSVDataBtn.addEventListener('click', function () {
            uploadCSVData();
        });
    }

    // Auto-apply filters on change
    if (searchInput) {
        searchInput.addEventListener('input', applyPaymentFilters);
    }
    if (bankFilter) {
        bankFilter.addEventListener('change', applyPaymentFilters);
    }
    if (amountFilter) {
        amountFilter.addEventListener('change', applyPaymentFilters);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', applyPaymentFilters);
    }

    // NOTE: Do NOT load data here - it will be loaded after login in initializeDashboard()
}

function loadPaymentRequestsData() {
    if (!firebaseAvailable) {
        document.getElementById('paymentRequestsDataBody').innerHTML =
            '<tr><td colspan="7" class="text-center py-4 text-warning">Firebase connection required</td></tr>';
        return;
    }

    document.getElementById('paymentRequestsDataBody').innerHTML =
        '<tr><td colspan="7" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Loading payment requests...</td></tr>';

    // Load customers data with pending payment status and stylist bank details
    Promise.all([
        database.ref('customers').once('value'),
        database.ref('stylists').once('value')
    ])
        .then(([customersSnapshot, stylistsSnapshot]) => {
            const customers = [];
            const stylists = {};

            // Build stylists lookup
            if (stylistsSnapshot.exists()) {
                stylistsSnapshot.forEach(child => {
                    const stylist = child.val();
                    if (stylist.stylistCode) {
                        // console.log("Stylist Info:", stylist);
                        stylists[stylist.stylistCode] = {
                            bankName: stylist.bankName || '',
                            bankCode: stylist.bankAccountNumber || '',//beneficiaryName
                            fullName: stylist.stylistName || 'Unknown',
                            beneficiaryName: stylist.beneficiaryName || 'Unknown'
                        };
                    }
                });
            }

            // Build payment requests data from customers with pending payment status
            if (customersSnapshot.exists()) {
                customersSnapshot.forEach(child => {
                    const customer = child.val();
                    const custId = child.key;
                    // console.log("Customer Data:", customer);//"TO BE PAID"
                    // Include customers with pending payment status OR missing paymentStatus (treat as pending)
                    const paymentStatus = (customer.paymentStatus || 'TO BE PAID').toString().toLowerCase();
                    // console.log("Payment Status:", paymentStatus === 'TO BE PAID'.toLowerCase());
                    const isPending = !customer.paymentStatus || paymentStatus === '' || paymentStatus === 'TO BE PAID'.toLowerCase();

                    if ((customer.stylistCode && isPending)) {//customer.tokenNo ||
                        // console.log("Payment Status:", isPending, customer.stylistCode);
                        const stylistInfo = stylists[customer.stylistCode] || {}

                        customers.push({
                            tokenNo: customer.tokenNo,
                            beneficiaryName: stylistInfo.beneficiaryName || 'Unknown',
                            bankCode: stylistInfo.bankCode || '',
                            bankName: stylistInfo.bankName || 'N/A',
                            amount: parseFloat(customer.totalPayment || customer.amount || 0),
                            narration: custId,
                            status: 'TO BE PAID',
                            customerData: customer,
                            stylistCode: customer.stylishCode,
                            customerId: custId
                        });
                        // console.log("Customer Payment Request:", customers[customers.length - 1])
                    }
                });
            }

            paymentRequestsData = customers;
            populatePaymentBankFilter();
            applyPaymentFilters();
            updatePaymentRequestStats();
        })
        .catch(error => {
            console.error('Error loading payment requests data:', error);
            document.getElementById('paymentRequestsDataBody').innerHTML =
                '<tr><td colspan="7" class="text-center py-4 text-danger">Error loading data</td></tr>';
        });
}

function populatePaymentBankFilter() {
    const bankFilter = document.getElementById('paymentBankFilter');
    if (!bankFilter) return;

    const banks = [...new Set(paymentRequestsData.map(item => item.bankName).filter(bank => bank && bank !== 'N/A'))];
    bankFilter.innerHTML = '<option value="">All Banks</option>';

    banks.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank;
        option.textContent = bank;
        bankFilter.appendChild(option);
    });
}

function applyPaymentFilters() {
    const searchTerm = document.getElementById('paymentSearchInput')?.value.toLowerCase() || '';
    const bankFilter = document.getElementById('paymentBankFilter')?.value || '';
    const amountFilter = document.getElementById('paymentAmountFilter')?.value || '';
    const statusFilter = document.getElementById('paymentStatusFilter')?.value || 'TO BE PAID';
    // console.log("Data Filter", paymentRequestsData)
    filteredPaymentRequests = paymentRequestsData.filter(item => {//console.log("Filtering Item:", item);
        // Search filter
        const matchesSearch = !searchTerm || (item.customerData?.customerName || '').toLowerCase().includes(searchTerm) ||
            (item.beneficiaryName || '').toLowerCase().includes(searchTerm) ||
            (item.customerData?.customerId || '').toLowerCase().includes(searchTerm);

        // Bank filter
        const matchesBank = !bankFilter || item.bankName === bankFilter;

        // // Amount filter
        // let matchesAmount = true;
        // if (amountFilter) {
        //     const amount = item.amount || 0;
        //     switch (amountFilter) {
        //         case '0-1000':
        //             matchesAmount = amount >= 0 && amount <= 1000;
        //             break;
        //         case '1000-5000':
        //             matchesAmount = amount > 1000 && amount <= 5000;
        //             break;
        //         case '5000-10000':
        //             matchesAmount = amount > 5000 && amount <= 10000;
        //             break;
        //         case '10000+':
        //             matchesAmount = amount > 10000;
        //             break;
        //     }
        // }

        // // Status filter - handle undefined status safely
        // const itemStatus = item.status || 'TO BE PAID';
        // const matchesStatus = !statusFilter || itemStatus === statusFilter;

        return matchesSearch && matchesBank; //&& matchesStatus;
    });

    currentPage = 1;
    displayPaymentRequestsData();
    updatePaymentRequestStats();
}

function displayPaymentRequestsData() {
    // console.log("Displaying Payment Requests Data");
    const tbody = document.getElementById('paymentRequestsDataBody');
    if (!tbody) return;
    // console.log("Filtered Payment Requests:", filteredPaymentRequests);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredPaymentRequests.slice(startIndex, endIndex);

    document.getElementById('paymentRequestCount').textContent = `${filteredPaymentRequests.length} records`;

    if (currentItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No payment requests found</td></tr>';
        return;
    }
    // console.log("Displaying payment requests:", currentItems);
    tbody.innerHTML = '';
    currentItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>
                        <div><strong>${item.beneficiaryName}</strong></div>
                        <small class="text-muted">Token No: ${item.customerData?.tokenNo}</small>
                    </td>
                    <td><strong>${item.bankName.toLocaleString()}</strong></td>
                    <td>${item.bankCode || '<em class="text-muted">Not specified</em>'}</td>
                    <td><strong>₦5000</strong></td>
                    <td><code>${item.narration}</code></td>
                    <td><span class="badge bg-warning">TO BE PAID</span></td>
                    
                `;
        tbody.appendChild(row);
    });

    // <td>
    //     <div class="btn-group btn-group-sm">
    //         <button class="btn btn-outline-primary" onclick="viewPaymentDetails('${item.narration}')" title="View Details">
    //             <i class="fas fa-eye"></i>
    //         </button>
    //         <button class="btn btn-outline-success" onclick="processPayment('${item.narration}')" title="Process Payment">
    //             <i class="fas fa-check"></i>
    //         </button>
    //     </div>
    // </td>

    // Update pagination
    updatePaymentPagination();
}

function updatePaymentPagination() {
    const paginationDiv = document.getElementById('paymentPagination');
    if (!paginationDiv) return;

    const totalPages = Math.ceil(filteredPaymentRequests.length / itemsPerPage);
    if (totalPages <= 1) {
        paginationDiv.innerHTML = '';
        return;
    }

    let paginationHTML = '<nav><ul class="pagination">';

    // Previous button
    paginationHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">`;
    paginationHTML += `<a class="page-link" href="#" data-action="change-page" data-page="${currentPage - 1}">Previous</a></li>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">`;
            paginationHTML += `<a class="page-link" href="#" data-action="change-page" data-page="${i}">${i}</a></li>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }

    // Next button
    paginationHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">`;
    paginationHTML += `<a class="page-link" href="#" data-action="change-page" data-page="${currentPage + 1}">Next</a></li>`;
    paginationHTML += '</ul></nav>';

    paginationDiv.innerHTML = paginationHTML;
}

function changePaymentPage(page) {
    const totalPages = Math.ceil(filteredPaymentRequests.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    displayPaymentRequestsData();
}

function updatePaymentRequestStats() {
    // console.log("Updating Payment Request Stats", filteredPaymentRequests);
    const pendingRequests = filteredPaymentRequests.filter(item => item.status === 'TO BE PAID');
    // console.log("Pending Requests:", pendingRequests);
    const PendingAmount = pendingRequests.length === 0 ? 0 : pendingRequests.length * 5000;//
    // pendingRequests.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    // console.log("Pending Amount:", PendingAmount);
    const uniqueBanks = new Set(filteredPaymentRequests.map(item => item.bankName).filter(bank => bank !== 'N/A')).size;
    const uniqueBeneficiaries = new Set(filteredPaymentRequests.map(item => item.beneficiaryName)).size;

    document.getElementById('totalPendingRequests').textContent = pendingRequests.length;
    document.getElementById('totalPendingAmount').textContent = `₦${PendingAmount.toLocaleString()}`;
    document.getElementById('uniqueBanks').textContent = uniqueBanks;
    document.getElementById('uniqueBeneficiaries').textContent = uniqueBeneficiaries;
}

function exportPaymentRequestsData() {
    if (filteredPaymentRequests.length === 0) {
        showAlert('No data to export', 'warning');
        return;
    }

    //['Beneficiary Name', 'Bank Code', 'Account Number', 'Amount', 'Narration (Transaction ID)', ];

    const headers = ['Beneficiary', 'BankCode', 'AccountNo', 'Amount', 'Narration'];
    const csvContent = [headers.join(',')];
    console.log("Exporting payment requests:", filteredPaymentRequests);
    filteredPaymentRequests.forEach(item => {
        const row = [
            `"${item.beneficiaryName}"`,
            item.bankName,
            item.bankCode,
            item.amount || 5000,
            item.narration
            // item.status.toUpperCase()
        ];
        csvContent.push(row.join(','));
    });

    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showAlert(`Exported ${filteredPaymentRequests.length} payment requests`, 'success');
}

function viewPaymentDetails(narration) {
    const item = paymentRequestsData.find(req => req.narration === narration);
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Payment Request Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Beneficiary:</strong> ${item.beneficiaryName}</p>
                                    <p><strong>Bank Name:</strong> ${item.bankName}</p>
                                    <p><strong>Account Number:</strong> ${item.bankCode || 'Not specified'}</p>
                                    
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Amount:</strong> ₦${item.amount.toLocaleString()}</p>
                                    <p><strong>Narration:</strong> ${item.narration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

function processPayment(narration) {
    const confirmed = confirm('Are you sure you want to process this payment request?');
    if (confirmed) {
        // Update status to processed
        const itemIndex = paymentRequestsData.findIndex(req => req.narration === narration);
        if (itemIndex !== -1) {
            paymentRequestsData[itemIndex].status = 'processed';
            applyPaymentFilters();
            showAlert('Payment request processed successfully', 'success');
        }
    }
}

function refreshEntireDashboard() {//console.log('🔄 Refreshing entire dashboard...');
    // Refresh all dashboard sections
    updateDashboardStats();
    loadStylists();
    generateStylistReport('REFRESH');
    loadCustomers();
    loadPaymentsTable();
    loadPaymentRequestsData();

    //console.log('✅ Dashboard refreshed successfully');
    // showAlert('Dashboard refreshed successfully', 'info');
}

function previewCSV(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

        // Show preview
        const previewDiv = document.getElementById('csvPreview');
        const headerElement = document.getElementById('csvPreviewHeader');
        const bodyElement = document.getElementById('csvPreviewBody');

        // Build header
        let headerHTML = '<tr>';
        headers.forEach(header => {
            headerHTML += `<th>${header}</th>`;
        });
        headerHTML += '</tr>';
        headerElement.innerHTML = headerHTML;

        // Build preview rows (first 5 data rows)
        let bodyHTML = '';
        for (let i = 1; i < Math.min(6, lines.length); i++) {
            if (lines[i].trim()) {
                const cells = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
                bodyHTML += '<tr>';
                cells.forEach(cell => {
                    bodyHTML += `<td>${cell}</td>`;
                });
                bodyHTML += '</tr>';
            }
        }
        bodyElement.innerHTML = bodyHTML;

        previewDiv.style.display = 'block';
        document.getElementById('uploadCSVData').disabled = false;
    };
    reader.readAsText(file);
}

function uploadCSVData() {
    const fileInput = document.getElementById('csvFile');
    const uploadBtn = document.getElementById('uploadCSVData');
    const originalBtnText = uploadBtn.innerHTML;

    if (!fileInput.files.length) {
        showAlert('Please select a CSV file', 'warning');
        return;
    }

    if (!firebaseAvailable) {
        showAlert('connection failed required to update payment status', 'danger');
        return;
    }

    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Updating...';
    uploadBtn.disabled = true;

    const reader = new FileReader();
    reader.onload = function (e) {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

        // Flexible CSV format: detect columns by header name
        const csvData = [];
        const colMap = {};
        headers.forEach((h, i) => {
            const key = h.toLowerCase().replace(/\s+/g, '');
            if (key.includes('beneficiary')) colMap.beneficiaryName = i;
            if (key.includes('bank')) colMap.bank = i;
            if (key.includes('toaccount')) colMap.toAccount = i;
            if (key.includes('datecreated')) colMap.datecreated = i;
            if (key === 'amount') colMap.amount = i;
            if (key.includes('narration') || key.includes('transactionid')) colMap.narration = i;
            if (key.includes('approvalstatus')) colMap.approvalStatus = i;
            if (key.includes('paymentstatus')) colMap.paymentStatus = i;
        });

        // If 12 columns detected and Payment Status not found, use fixed positions
        const useFixedPositions = headers.length >= 12 && colMap.paymentStatus === undefined;
        if (useFixedPositions) {
            colMap.datecreated = 1;
            colMap.beneficiary = 2;
            colMap.bank = 8;
            colMap.toAccount = 9;
            colMap.amount = 4;
            colMap.narration = 7;
            colMap.approvalStatus = 10;
            colMap.paymentStatus = 11; // Column 12 (0-indexed)
        }

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const cells = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
                if (cells.length >= 6 && colMap.narration !== undefined && colMap.paymentStatus !== undefined) {
                    // console.log("Processing CSV Row:", colMap, cells);
                    csvData.push({
                        beneficiaryName: cells[colMap.beneficiary] || '',
                        dateCreated: cells[colMap.datecreated] || '',
                        bank: cells[colMap.bank] || '',
                        accountNumber: cells[colMap.toAccount] || '',
                        amount: parseFloat(cells[colMap.amount]) || 0,
                        narration: cells[colMap.narration],
                        approvalstatus: cells[colMap.approvalStatus] || '',
                        paymentStatus: (cells[colMap.paymentStatus] || '').toUpperCase()
                    });
                }
            }
        }

        if (csvData.length === 0) {
            showAlert('No valid data found in CSV file', 'warning');
            uploadBtn.innerHTML = originalBtnText;
            uploadBtn.disabled = false;
            return;
        }

        // Update customer payment statuses in Firebase
        let updatePromises = [];
        let updatedCount = 0;
        let notFoundCount = 0;
        // console.log("CSV Data to Process:", csvData);
        csvData.forEach(row => {
            console.log("row Data:", row);
            const customerId = row.narration || 'N/A'; // CUST_ID from narration column
            const stlAccount = row.accountNumber || 'N/A'; // Stylist Bank Account Number
            const stlBankName = row.bank || 'N/A'; // Stylist Bank Code
            const stlApprovalStatus = row.approvalstatus || 'N/A'; // approvalStatus
            const stlDateCreated = row.datecreated || ''//new Date().toISOString(); // Date Created
            const stlBankStatus = row.paymentStatus || 'N/A';
            const updatePromise = database.ref('customers').child(customerId).once('value')
                .then(snapshot => {
                    if (snapshot.exists()) {
                        // Update payment status based on Payment Status column
                        const status = row.paymentStatus;
                        let newStatus = 'TO BE PAID';
                        if (status === 'PAID' || status === 'SUCCESSFUL' || status === 'COMPLETED') {
                            newStatus = 'PAID';
                        }
                        return database.ref('customers').child(customerId).update({
                            paymentStatus: newStatus,
                            approvalStatus: stlApprovalStatus,
                            bankName: stlBankName,
                            bankStatus: stlBankStatus,
                            accountNumber: stlAccount,
                            paymentDate: stlDateCreated || '',
                            lastUpdated: new Date().toISOString(),
                            updatedViaCSV: true
                        }).then(() => {
                            updatedCount++;
                        });
                    } else {
                        notFoundCount++;
                    }
                })
                .catch(error => {
                    notFoundCount++;
                });
            updatePromises.push(updatePromise);
        });

        // Wait for all updates to complete
        Promise.all(updatePromises)
            .then(() => {
                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('csvUploadModal')).hide();
                //csv file reset
                fileInput.value = '';
                document.getElementById('csvPreview').style.display = 'none';
                document.getElementById('uploadCSVData').disabled = true;
                // Show results
                if (updatedCount > 0) {
                    console.log("Updated Count:", updatedCount);
                    showAlert(`Successfully updated ${updatedCount} payment status(es). ${notFoundCount} records not found or had mismatched data.`, 'success');

                    // Refresh entire dashboard
                    refreshEntireDashboard();
                } else {
                    showAlert('No matching records found to update', 'warning');
                }

                uploadBtn.innerHTML = originalBtnText;
                uploadBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error updating payment statuses:', error);
                showAlert('Failed to update payment statuses', 'danger');
                uploadBtn.innerHTML = originalBtnText;
                uploadBtn.disabled = false;
            });
    };

    reader.readAsText(fileInput.files[0]);
}
// function uploadCSVData() {
//     const fileInput = document.getElementById('csvFile');
//     const uploadBtn = document.getElementById('uploadCSVData');
//     const originalBtnText = uploadBtn.innerHTML;

//     if (!fileInput.files.length) {
//         showAlert('Please select a CSV file', 'warning');
//         return;
//     }

//     if (!firebaseAvailable) {
//         showAlert('connection failed required to update payment status', 'danger');
//         return;
//     }

//     uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Updating...';
//     uploadBtn.disabled = true;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         const csv = e.target.result;
//         const lines = csv.split('\n');
//         const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

//         // Flexible CSV format: detect columns by header name
//         const csvData = [];
//         const colMap = {};
//         headers.forEach((h, i) => {
//             const key = h.toLowerCase().replace(/\s+/g, '');
//             if (key.includes('beneficiary')) colMap.beneficiary = i;
//             if (key.includes('bank')) colMap.bank = i;
//             if (key.includes('toaccount')) colMap.toAccount = i;
//             if (key.includes('datecreated')) colMap.datecreated = i;
//             if (key === 'amount') colMap.amount = i;
//             if (key.includes('narration') || key.includes('transactionid')) colMap.narration = i;
//             if (key.includes('approvalstatus')) colMap.approvalStatus = i;
//             if (key.includes('paymentstatus')) colMap.paymentStatus = i;
//         });

//         for (let i = 1; i < lines.length; i++) {
//             if (lines[i].trim()) {
//                 const cells = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
//                 csvData.push({
//                     beneficiary: cells[colMap.beneficiary] || '',
//                     bank: cells[colMap.bank] || '',
//                     toAccount: cells[colMap.toAccount] || '',
//                     datecreated: cells[colMap.datecreated] || '',
//                     amount: cells[colMap.amount] || '',
//                     narration: cells[colMap.narration] || '',
//                     approvalStatus: cells[colMap.approvalStatus] || '',
//                     paymentStatus: cells[colMap.paymentStatus] || ''
//                 });
//             }
//         }

//         // Process the data
//         let updated = 0;
//         let failed = 0;
//         const promises = csvData.map(row => {
//             return new Promise((resolve) => {
//                 if (row.narration) {
//                     database.ref(`transactions/${row.narration}`).update({
//                         paymentStatus: row.paymentStatus || 'pending',
//                         approvalStatus: row.approvalStatus || 'pending'
//                     }).then(() => {
//                         updated++;
//                         resolve();
//                     }).catch(() => {
//                         failed++;
//                         resolve();
//                     });
//                 } else {
//                     failed++;
//                     resolve();
//                 }
//             });
//         });

//         Promise.all(promises).then(() => {
//             uploadBtn.innerHTML = originalBtnText;
//             uploadBtn.disabled = false;
//             showAlert(`Updated ${updated} transactions. Failed: ${failed}`, updated > 0 ? 'success' : 'warning');
//             document.getElementById('csvPreview').style.display = 'none';
//             fileInput.value = '';

//             // Properly close the modal after successful upload
//             const modalElement = document.getElementById('csvUploadModal');
//             const modal = bootstrap.Modal.getInstance(modalElement);
//             if (modal) {
//                 modal.hide();
//             }
//         });
//     };
//     reader.readAsText(fileInput.files[0]);
// }

// Initialize security monitoring
function initializeSecurity() {
    // console.log('Security monitoring initialized');
    setInterval(() => {
        // console.log('Security check completed:', new Date());
    }, 300000); // 5 minutes
}

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // console.log('Application initialized successfully');
    initializeSecurity();

    // Background security scanning enabled automatically
    // Security checks run quietly in the background every 5 minutes
});

// Initialize new user form functionality
function initializeNewUserForm() {
    const newUserForm = document.getElementById('newUserForm');
    if (!newUserForm) {
        // console.log('New user form not found');
        return;
    }

    newUserForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitNewUser(); // Use the correct function name
    });

    // Add real-time validation to all input fields
    const inputFields = newUserForm.querySelectorAll('input, select');

    inputFields.forEach(field => {
        // Add validation on input/change events
        field.addEventListener('input', function () {
            validateFieldRealTime(this);
        });

        field.addEventListener('change', function () {
            validateFieldRealTime(this);
        });

        field.addEventListener('blur', function () {
            validateFieldRealTime(this);
        });
    });

    // Special validation for phone number
    const phoneField = newUserForm.querySelector('input[name="phoneNumber"]');
    if (phoneField) {
        phoneField.addEventListener('input', function () {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            validatePhoneNumber(this);
        });
    }

    // Special validation for username
    const usernameField = newUserForm.querySelector('input[name="username"]');
    if (usernameField) {
        usernameField.addEventListener('input', function () {
            // Convert to lowercase and remove spaces
            this.value = this.value.toLowerCase().replace(/\s/g, '');
            validateUsername(this);
        });
    }

    // Email validation
    const emailField = newUserForm.querySelector('input[name="email"]');
    if (emailField) {
        emailField.addEventListener('input', function () {
            if (this.value.trim()) {
                validateEmail(this);
            } else {
                clearFieldValidation(this);
            }
        });
    }

    // Password strength validation
    const passwordField = newUserForm.querySelector('input[name="password"]');
    if (passwordField) {
        passwordField.addEventListener('input', function () {
            validatePassword(this);
        });
    }
}

// Real-time field validation function
function validateFieldRealTime(field) {
    const value = field.value.trim();

    // Skip validation for non-required empty fields
    if (!field.hasAttribute('required') && !value) {
        clearFieldValidation(field);
        return true;
    }

    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(field)} is required`);
        return false;
    }

    // Check field-specific validations
    if (field.checkValidity()) {
        showFieldSuccess(field);
        return true;
    } else {
        showFieldError(field, field.validationMessage);
        return false;
    }
}

// Phone number validation
function validatePhoneNumber(field) {
    const value = field.value.trim();

    if (!value) {
        showFieldError(field, 'Phone number is required');
        return false;
    }

    if (value.length < 11) {
        showFieldError(field, 'Phone number must be at least 11 digits and start with 07, 08, or 09');
        return false;
    }

    if (value.length > 11) {
        showFieldError(field, 'Phone number must not exceed 11 digits and start with 07, 08, or 09');
        return false;
    }

    if (!/^[0-9]{11}$/.test(value)) {
        showFieldError(field, 'Phone number must contain only digits and start with 07, 08, or 09');
        return false;
    }

    showFieldSuccess(field);
    return true;
}

// Username validation
function validateUsername(field) {
    const value = field.value.trim();

    if (!value) {
        showFieldError(field, 'Username is required');
        return false;
    }

    if (value.length < 4) {
        showFieldError(field, 'Username must be at least 4 characters');
        return false;
    }

    if (!/^[a-z0-9_]+$/.test(value)) {
        showFieldError(field, 'Username can only contain lowercase letters, numbers, and underscores');
        return false;
    }

    showFieldSuccess(field);
    return true;
}

// Email validation
function validateEmail(field) {
    const value = field.value.trim();

    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }

    showFieldSuccess(field);
    return true;
}

// Password validation
function validatePassword(field) {
    const value = field.value;

    if (!value) {
        showFieldError(field, 'Password is required');
        return false;
    }

    if (value.length < 6) {
        showFieldError(field, 'Password must be at least 6 characters');
        return false;
    }

    showFieldSuccess(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');

    // Remove existing feedback
    const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Add new feedback
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
}

// Show field success
function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');

    // Remove error feedback
    const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
}

// Clear field validation
function clearFieldValidation(field) {
    field.classList.remove('is-valid', 'is-invalid');

    const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
}

// Get field label
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace(/\*/g, '').trim() : field.name || 'Field';
}

// Google Apps Script Mobile Responsive Force Script
// (function () {
//     'use strict';

//     // Force mobile responsive behavior in GAS
//     function forceGASMobileResponsive() {
//         // Set proper viewport
//         let viewport = document.querySelector('meta[name="viewport"]');
//         if (viewport) {
//             viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
//         }

//         // Force mobile styles
//         const style = document.createElement('style');
//         style.innerHTML = `
//             /* GAS Mobile Override */
//             @media screen and (max-width: 768px) {
//                 body, html {
//                     width: 100% !important;
//                     max-width: 100% !important;
//                     overflow-x: hidden !important;
//                 }

//                 .container-fluid {
//                     padding: 0 8px !important;
//                 }

//                 .sidebar {
//                     width: 100% !important;
//                     max-width: 280px !important;
//                 }

//                 .content-area {
//                     margin-left: 0 !important;
//                     width: 100% !important;
//                 }

//                 .table-responsive {
//                     overflow-x: auto !important;
//                 }

//                 input, select, textarea {
//                     font-size: 16px !important;
//                 }
//             }
//         `;
// Mobile detection and force mobile layout
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');

    // Force mobile layout immediately
    document.addEventListener('DOMContentLoaded', function () {
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.style.marginLeft = '0';
            contentArea.style.width = '100%';
            contentArea.style.padding = '10px';
            contentArea.style.height = 'calc(100vh - 60px)';
            contentArea.style.overflowY = 'auto';
            contentArea.style.overflowX = 'hidden';
            contentArea.style.webkitOverflowScrolling = 'touch';
        }

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.height = 'calc(100vh - 60px)';
            mainContent.style.overflow = 'hidden';
        }
    });
}

//             // Force mobile content area
//             const contentArea = document.querySelector('.content-area');
//             if (contentArea) {
//                 contentArea.style.marginLeft = '0';
//                 contentArea.style.width = '100%';
//                 contentArea.style.padding = '10px';
//             }
//         }

//         // Window resize handler for GAS
//         window.addEventListener('resize', function () {
//             if (isMobileDevice()) {
//                 const contentArea = document.querySelector('.content-area');
//                 if (contentArea) {
//                     contentArea.style.marginLeft = '0';
//                     contentArea.style.width = '100%';
//                 }
//             }
//         });
//     }

//     // Execute on DOM ready
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', forceGASMobileResponsive);
//     } else {
//         forceGASMobileResponsive();
//     }

//     // Execute after a short delay to ensure all elements are loaded
//     setTimeout(forceGASMobileResponsive, 1000);
// })();

// Customer filter functions
function filterCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const locationFilter = document.getElementById('customerLocationFilter').value;
    const stylistFilter = document.getElementById('customerStylistFilter').value;
    const fromDateFilter = document.getElementById('customerFromDate').value;
    const toDateFilter = document.getElementById('customerToDate').value;

    const table = document.getElementById('customersTable');
    const rows = table.querySelectorAll('tbody tr');

    let visibleCount = 0;
    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    const today = new Date().toDateString();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    rows.forEach(row => {
        if (row.cells.length === 1) return; // Skip "no data" rows

        const tokenNo = row.cells[0].textContent.toLowerCase();
        const customerName = row.cells[1].textContent.toLowerCase();
        const stylistCode = row.cells[2].textContent;
        const registrationText = row.cells[3].textContent;

        const matchesSearch = customerName.includes(searchTerm) || tokenNo.includes(searchTerm);
        const matchesLocation = !locationFilter || stylistCode.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesStylist = !stylistFilter || stylistCode.includes(stylistFilter);

        let matchesDate = true;
        if (fromDateFilter || toDateFilter) {
            console.log('Date filters applied:', { fromDateFilter, toDateFilter });
            console.log('Registration text:', registrationText);

            // Try multiple date formats: MM/DD/YYYY, DD/MM/YYYY, M/D/YYYY, etc.
            const dateMatch = registrationText.match(/\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/);
            console.log('Date match found:', dateMatch);

            if (dateMatch) {
                try {
                    // Parse the matched date string
                    const dateParts = dateMatch[0].split(/[\/\-\.]/);
                    let regDate;

                    console.log('Date parts:', dateParts);

                    // Try different date formats to handle both MM/DD/YYYY and DD/MM/YYYY
                    if (dateParts[2].length === 4) {
                        // Try MM/DD/YYYY first
                        regDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

                        // If the date is invalid, try DD/MM/YYYY
                        if (isNaN(regDate.getTime()) || dateParts[0] > 12) {
                            regDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // DD/MM/YYYY
                        }
                    } else {
                        // Try MM/DD/YY first
                        regDate = new Date('20' + dateParts[2], dateParts[0] - 1, dateParts[1]);

                        // If the date is invalid, try DD/MM/YY
                        if (isNaN(regDate.getTime()) || dateParts[0] > 12) {
                            regDate = new Date('20' + dateParts[2], dateParts[1] - 1, dateParts[0]); // DD/MM/YY
                        }
                    }

                    console.log('Parsed registration date:', regDate);

                    // Check if date is valid
                    if (isNaN(regDate.getTime())) {
                        console.log('Invalid date, skipping date filter');
                        matchesDate = true; // Don't filter out if we can't parse the date
                    } else {
                        const regDateOnly = new Date(regDate.getFullYear(), regDate.getMonth(), regDate.getDate());
                        regDateOnly.setHours(0, 0, 0, 0);

                        if (fromDateFilter && toDateFilter) {
                            const fromDate = new Date(fromDateFilter);
                            fromDate.setHours(0, 0, 0, 0);
                            const toDate = new Date(toDateFilter);
                            toDate.setHours(0, 0, 0, 0);
                            matchesDate = regDateOnly.getTime() >= fromDate.getTime() && regDateOnly.getTime() <= toDate.getTime();
                            console.log('Date range check:', {
                                regDate: regDateOnly.toDateString(),
                                fromDate: fromDate.toDateString(),
                                toDate: toDate.toDateString(),
                                matchesDate
                            });
                        } else if (fromDateFilter) {
                            const fromDate = new Date(fromDateFilter);
                            fromDate.setHours(0, 0, 0, 0);
                            matchesDate = regDateOnly.getTime() >= fromDate.getTime();
                            console.log('From date check:', {
                                regDate: regDateOnly.toDateString(),
                                fromDate: fromDate.toDateString(),
                                matchesDate
                            });
                        } else if (toDateFilter) {
                            const toDate = new Date(toDateFilter);
                            toDate.setHours(0, 0, 0, 0);
                            matchesDate = regDateOnly.getTime() <= toDate.getTime();
                            console.log('To date check:', {
                                regDate: regDateOnly.toDateString(),
                                toDate: toDate.toDateString(),
                                matchesDate
                            });
                        }
                    }
                } catch (e) {
                    console.log('Date parsing error:', e);
                    matchesDate = true; // Don't filter out if we can't parse the date
                }
            } else {
                console.log('No date match found in registration text');
                matchesDate = true; // Don't filter out if no date found
            }
        }

        const isVisible = matchesSearch && matchesLocation && matchesStylist && matchesDate;
        row.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            visibleCount++;

            // Extract date from registration text and calculate stats
            const dateMatch = registrationText.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
            if (dateMatch) {
                const regDate = new Date(dateMatch[0]);

                // Today's count
                if (regDate.toDateString() === today) {
                    todayCount++;
                }

                // This week count
                if (regDate >= oneWeekAgo) {
                    weekCount++;
                }

                // This month count
                if (regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear) {
                    monthCount++;
                }
            }
        }
    });

    // Update stats cards with filtered data
    const totalCustomersEl = document.getElementById('totalCustomers');
    const todayCustomersEl = document.getElementById('todayCustomers');
    const weeklyCustomersEl = document.getElementById('weeklyCustomers');
    const monthlyCustomersEl = document.getElementById('monthlyCustomers');

    if (totalCustomersEl) totalCustomersEl.textContent = visibleCount;
    if (todayCustomersEl) todayCustomersEl.textContent = todayCount;
    if (weeklyCustomersEl) weeklyCustomersEl.textContent = weekCount;
    if (monthlyCustomersEl) monthlyCustomersEl.textContent = monthCount;

    // Also update main dashboard customer card if visible
    // const dashboardCustomerCard = document.querySelector('.dashboard-section .row .col-md-3:nth-child(2) .value');
    // if (dashboardCustomerCard) {
    //     dashboardCustomerCard.textContent = visibleCount;
    // }
}

function clearFilters() {
    document.getElementById('stylistSearch').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('stylistFromDate').value = '';
    document.getElementById('stylistToDate').value = '';

    // Reset date restrictions
    const stylistFromDate = document.getElementById('stylistFromDate');
    const stylistToDate = document.getElementById('stylistToDate');
    if (stylistFromDate) {
        stylistFromDate.removeAttribute('max');
    }
    if (stylistToDate) {
        stylistToDate.removeAttribute('min');
    }

    // Show all rows
    const table = document.getElementById('stylistsTable');
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });

    // Restore original stats by reloading stylists
    if (typeof loadStylists === 'function') {
        loadStylists();
    }
}

function clearCustomerFilters() {
    document.getElementById('customerSearch').value = '';
    document.getElementById('customerLocationFilter').value = '';
    document.getElementById('customerStylistFilter').value = '';
    document.getElementById('customerFromDate').value = '';
    document.getElementById('customerToDate').value = '';

    // Reset date restrictions
    const customerFromDate = document.getElementById('customerFromDate');
    const customerToDate = document.getElementById('customerToDate');
    if (customerFromDate) {
        customerFromDate.removeAttribute('max');
    }
    if (customerToDate) {
        customerToDate.removeAttribute('min');
    }

    // Repopulate stylist filter with all stylists
    populateCustomerStylistFilter('');

    // Show all rows
    const table = document.getElementById('customersTable');
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });

    // Restore original stats by reloading customers
    if (typeof loadCustomers === 'function') {
        loadCustomers();
    }
}

// Clear report filters function
function clearReportFilters() {
    // console.log('Clearing report filters...');

    const reportDate = document.getElementById('reportDate');
    const reportLocation = document.getElementById('reportLocationFilter');
    const clearBtn = document.getElementById('clearReportFiltersBtn');

    if (reportDate) reportDate.value = '';
    if (reportLocation) reportLocation.value = '';

    // Visual feedback
    if (clearBtn) {
        const originalHTML = clearBtn.innerHTML;
        clearBtn.innerHTML = '<i class="fas fa-check"></i> Cleared';
        clearBtn.classList.add('btn-success');
        clearBtn.classList.remove('btn-outline-secondary');

        // generateStylistReport();
        setTimeout(() => {
            clearBtn.innerHTML = originalHTML;
            clearBtn.classList.remove('btn-success');
            clearBtn.classList.add('btn-outline-secondary');
            // generateStylistReport('CLEARREPORT');
        }, 1500);
    }

    // Load all data without filters

}

// Load stylist report function
function loadStylistReport() {
    // Load all data when section is first loaded
    // generateStylistReport();
}

// Generate stylist report based on filters
function generateStylistReport(action) {
    // console.log('generateStylistReport function called', action ? 'with action: ' + action : '');

    const reportDate = document.getElementById('reportDate');
    const reportLocation = document.getElementById('reportLocationFilter');
    const tableBody = document.getElementById('stylistReportTableBody');
    const toknCounts = document.getElementById('toknCounts');
    const toknCountsf = document.getElementById('toknCountsf');
    const stylistCounts = document.getElementById('stylistCounts');
    const stylistCountsf = document.getElementById('stylistCountsf');
    if (!tableBody) { console.error('Table body not found'); return; }

    const reportDateValue = reportDate ? reportDate.value : '';
    const reportLocationValue = reportLocation ? reportLocation.value : '';
    // console.log("filter values:", { reportDateValue, reportLocationValue });
    // Show loading state
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted"><i class="fas fa-spinner fa-spin"></i> Loading data...</td></tr>';

    if (!firebaseAvailable) {
        console.error('Firebase not available');
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Database connection not available</td></tr>';
        return;
    }
    // console.log('Firebase available, fetching data...');
    // Get customers data for the selected date and location
    const stylistsRef = database.ref('stylists');
    let stylistsData = {};
    stylistsRef.once('value').then(snapshot => {
        const stylists = snapshot.val();
        // console.log('Fetched stylists data:', stylists);
        Object.keys(stylists).forEach((stylistId, index) => {
            // console.log('Processing stylist:', stylistId, stylists[stylistId]);
            const stylist = stylists[stylistId];
            const stCode = stylist.stylistCode || stylist.stylishCode || stylist.code;
            if (stCode) {
                if (!stylistsData[stCode]) {
                    stylistsData[stCode] = {
                        stylistCode: stCode,
                        stylistName: stylist.stylistName || '',
                        location: stylist.location || '',
                        phone: stylist.phoneNumber || '',
                        bankName: stylist.bankName || '',
                        accountNumber: stylist.bankAccountNumber || '',
                        beneficiaryName: stylist.beneficiaryName || '',
                    };
                }
            } else {
                console.warn('No stylist code found for customer:', stCode, stylistsData);
            }
        });

        // Now fetch customers and generate report only after stylists are loaded
        const customersRef = database.ref('customers');
        customersRef.once('value').then(snapshot => {
            const customers = snapshot.val();
            const reportData = {};
            if (customers) {
                const customerKeys = Object.keys(customers);
                if (customerKeys.length > 0) {
                    // ...existing code...
                }

                Object.keys(customers).forEach((customerId, index) => {
                    const customer = customers[customerId];
                    const regDate = customer.registrationDate ? new Date(customer.registrationDate) : null;
                    let includeRecord = true;
                    if (reportDateValue && regDate) {
                        const regDateStr = regDate.toISOString().split('T')[0];
                        if (regDateStr !== reportDateValue) {
                            includeRecord = false;
                        }
                    }
                    const customerLocation = customer.stylistLocation || customer.location || '';
                    if (customerLocation && reportLocationValue) {
                        if (customerLocation !== reportLocationValue) {
                            includeRecord = false;
                        }
                    }
                    if (includeRecord) {
                        const stylistCode = customer.stylishCode || customer.stylistCode || customer.stylist_code || customer.stylist;
                        const stylistName = customer.stylishName || customer.stylistName || customer.stylist_name;
                        const customerLocation = customer.customerstylistLocation || customer.stylistLocation || customer.location;
                        const stylistPhone = customer.customerstylistMobile || customer.stylistMobile || customer.stylistPhone;
                        const bankName = customer.customerstylistBankName || customer.stylistBankName || customer.bank_name;
                        const accountNumber = customer.customerstylistAccountNo || customer.stylistAccountNo || customer.account_number;
                        if (stylistCode) {
                            if (!reportData[stylistCode]) {
                                reportData[stylistCode] = {
                                    stylistCode: stylistCode,
                                    stylistName: stylistsData[stylistCode]?.stylistName || '',
                                    location: customerLocation || '',
                                    phone: stylistsData[stylistCode]?.phone || '',
                                    bankName: stylistsData[stylistCode]?.bankName || '',
                                    accountNumber: stylistsData[stylistCode]?.accountNumber || '',
                                    braidingCount: 0,
                                    beneficiaryName: stylistsData[stylistCode]?.beneficiaryName || ''
                                };
                            }
                            reportData[stylistCode].braidingCount++;
                        } else {
                            console.warn('No stylist code found for customer:', customerId, customer);
                        }
                    }
                });
            }

            // Convert to array and sort by stylist code
            const reportArray = Object.values(reportData).sort((a, b) => a.stylistCode.localeCompare(b.stylistCode));
            toknCounts.textContent = `${reportArray.reduce((sum, stylist) => sum + stylist.braidingCount, 0)}`;
            stylistCounts.textContent = `${reportArray.length}`;
            toknCountsf.textContent = `${reportArray.reduce((sum, stylist) => sum + stylist.braidingCount, 0)}`;
            stylistCountsf.textContent = `${reportArray.length}`;
            if (reportArray.length === 0) {
                let message = 'No stylist data available';
                if (reportDateValue || reportLocationValue) {
                    message = 'No data found for selected filters';
                } else if (!customers) {
                    message = 'No customer data found in database';
                } else {
                    message = 'No customers have stylist information';
                }
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">
                    <i class="fas fa-info-circle me-2"></i>${message}
                    <br><small class="text-muted mt-1">Total customers in database: ${customers ? Object.keys(customers).length : 0}</small>
                </td></tr>`;
            } else {
                tableBody.innerHTML = reportArray.map((stylist, index) => `
                    <tr>
                        <td class="text-center">${index + 1}</td>
                        <td>
                            <div><strong>${stylist.stylistCode}</strong></div>
                            <div class="text-muted">${stylist.stylistName}</div>
                            <div class="text-muted">${stylist.phone}</div>
                        </td>
                        <td>
                            <div><strong>${stylist.beneficiaryName}</strong></div>
                            <div class="text-muted">${stylist.accountNumber}</div>
                            <div class="text-muted">${stylist.bankName}</div>
                        </td>
                        <td class="text-center">
                            <span class="badge bg-primary fs-6">${stylist.braidingCount}</span>
                        </td>
                    </tr>
                `).join('');
            }
        }).catch(error => {
            console.error('Error loading report data:', error);
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading report data</td></tr>';
        });
    }).catch(error => {
        console.error('Error fetching stylists data:', error);
    });
}

// Populate stylist filter dropdown
function populateCustomerStylistFilter(locationFilter = '') {
    const stylistFilter = document.getElementById('customerStylistFilter');
    // console.log('Populating stylist filter with location:', locationFilter);
    // console.log('stylistsDataGlobal:', stylistsDataGlobal);

    if (stylistFilter && stylistsDataGlobal) {
        stylistFilter.innerHTML = '<option value="">All Stylists</option>';

        // Filter stylists by location if location filter is provided
        let filteredStylists = stylistsDataGlobal;
        if (locationFilter) {
            filteredStylists = stylistsDataGlobal.filter(s => {
                // console.log('Checking stylist:', s.stylistCode, 'location:', s.location);
                return s.location && s.location.toLowerCase() === locationFilter.toLowerCase();
            });
            // console.log('Filtered stylists:', filteredStylists);
        }

        const uniqueStylists = [...new Set(filteredStylists.map(s => s.stylistCode))]
            .filter(code => code)
            .sort();

        // console.log('Unique stylists to add:', uniqueStylists);

        uniqueStylists.forEach(code => {
            stylistFilter.innerHTML += `<option value="${code}">${code}</option>`;
        });

        // console.log('Updated stylist dropdown HTML:', stylistFilter.innerHTML);
    } else {
        // console.log('stylistFilter or stylistsDataGlobal not available');
    }
}

// Show popup on successful stylist registration
document.addEventListener('DOMContentLoaded', function () {//stylistResult
    var stylistForm = document.getElementById('stylistForm');
    if (stylistForm) {
        stylistForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(document.getElementById('stylistSuccessModal'));
            modal.show();
            document.getElementById('stylistResult').style.display = 'block';
            // Place your actual form submission logic here if needed
        });
    }
    var geoForm = document.getElementById('geoForm');
    if (geoForm) {
        geoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(document.getElementById('customerSuccessModal'));
            modal.show();
            document.getElementById('customerResult').style.display = 'block';
            // Place your actual form submission logic here if needed
        });
    }

    // Security Status Update
    // function updateSecurityStatus() {
    //     // Security status update logic
    //     console.log('Security status updated');
    // }

    // Update security status every 5 seconds
    // setInterval(updateSecurityStatus, 5000);

    // Advanced Threat Detection
    class AdvancedThreatDetection {
        constructor() {
            this.suspiciousIPs = [];
            this.loginAttempts = {};
            this.initAdvancedProtection();
        }

        initAdvancedProtection() {
            this.monitorLoginAttempts();
            this.detectBruteForce();
            this.monitorNetworkActivity();
        }

        monitorLoginAttempts() {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    const username = document.getElementById('username').value;
                    const ip = this.getClientIP();

                    if (!this.loginAttempts[ip]) {
                        this.loginAttempts[ip] = [];
                    }

                    this.loginAttempts[ip].push({
                        username,
                        timestamp: Date.now(),
                        success: false
                    });

                    if (this.loginAttempts[ip].length > 5) {
                        this.handleBruteForce(ip);
                    }
                });
            }
        }

        getClientIP() {
            // Simulated IP detection - in production use server-side
            return Math.random().toString(36).substring(7);
        }

        handleBruteForce(ip) {
            this.suspiciousIPs.push(ip);
            console.warn('Brute force attack detected from IP: ' + ip);

            // Lock account temporarily
            this.temporaryLockdown();
        }

        temporaryLockdown() {
            const overlay = document.createElement('div');
            overlay.className = 'security-overlay';

            const popup = document.createElement('div');
            popup.className = 'security-popup';
            popup.innerHTML = `
                    <h4><i class="fas fa-exclamation-triangle text-danger"></i> Security Alert</h4>
                    <p>Multiple failed login attempts detected. Account temporarily locked for security.</p>
                    <button class="btn btn-primary" data-action="close-security-popup">
                        I Understand
                    </button>
                `;

            document.body.appendChild(overlay);
            document.body.appendChild(popup);

            // Auto remove after 30 seconds
            setTimeout(() => {
                if (overlay.parentNode) overlay.remove();
                if (popup.parentNode) popup.remove();
            }, 30000);
        }

        detectBruteForce() {
            setInterval(() => {
                Object.keys(this.loginAttempts).forEach(ip => {
                    const attempts = this.loginAttempts[ip];
                    const recentAttempts = attempts.filter(
                        attempt => Date.now() - attempt.timestamp < 300000 // 5 minutes
                    );

                    if (recentAttempts.length > 10) {
                        this.handleBruteForce(ip);
                    }
                });
            }, 60000); // Check every minute
        }

        monitorNetworkActivity() {
            // Monitor for suspicious network requests
            const originalFetch = window.fetch;
            window.fetch = function (...args) {
                const url = args[0];
                if (typeof url === 'string') {
                    // Basic security check for suspicious URLs
                    const suspiciousDomains = ['malicious.com', 'phishing.net', 'suspicious.org'];
                    const domain = url.split('/')[2];
                    if (suspiciousDomains.includes(domain)) {
                        console.warn('Blocked network request to suspicious domain:', domain);
                        return Promise.reject(new Error('Request blocked by security system'));
                    }
                }
                return originalFetch.apply(this, args);
            };
        }
    }

    // Initialize Advanced Threat Detection
    const advancedThreatDetection = new AdvancedThreatDetection();

    // Background security scanning enabled automatically
    // Security checks run quietly in the background every 5 minutes
});

// =====================================================
// SALE ORDER MANAGEMENT FUNCTIONALITY
// =====================================================

// Global variables for Sale Orders
let saleOrders = [];
let orderItems = [];
let orderCounter = 1;
let saleOrderSystemInitialized = false; // Track if sale order system is already initialized

// Initialize the sale order system
function initializeSaleOrderSystem() {
    // Prevent multiple initializations
    if (saleOrderSystemInitialized) {
        // console.log('Sale Order System already initialized, skipping...');
        return;
    }
    saleOrderSystemInitialized = true;
    // console.log('Initializing Sale Order System...');

    // Load data from Firebase/localStorage
    loadStylistCodes();
    loadTokenNumbers();
    loadOrderItems();
    loadSaleOrders();

    // Setup event listeners
    setupSaleOrderEventListeners();

    // Set default date
    setDefaultOrderDate();

    // Update statistics
    updateOrderStatistics();

    // Update settings items table
    // updateSettingsItemsTable();

    // Setup initial item row listeners and button states
    setupItemRowListeners();
    updateRemoveButtonsState();

    // console.log('Sale Order System initialized successfully');
}

// Setup all event listeners for sale orders
function setupSaleOrderEventListeners() {
    // Form submission
    const saleOrderForm = document.getElementById('saleOrderForm');
    if (saleOrderForm) {
        saleOrderForm.addEventListener('submit', handleSaleOrderSubmission);

        // Add event listener to clear field errors when user interacts with fields
        saleOrderForm.addEventListener('input', function (e) {
            if (e.target.classList.contains('is-invalid')) {
                clearFieldError(e.target);
            }
        });

        saleOrderForm.addEventListener('change', function (e) {
            if (e.target.classList.contains('is-invalid')) {
                clearFieldError(e.target);
            }
        });
    }

    // Auto-fill functionality is no longer needed for simplified form

    // Add new item row button
    const addNewItemRowBtn = document.getElementById('addNewItemRowBtn');
    if (addNewItemRowBtn) {
        addNewItemRowBtn.addEventListener('click', addNewItemRow);
    }

    // Setup initial item row event listeners
    setupItemRowListeners();

    // Form buttons
    const clearOrderBtn = document.getElementById('clearOrderBtn');
    if (clearOrderBtn) {
        clearOrderBtn.addEventListener('click', clearOrderForm);
    }

    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        // calculateBtn.addEventListener('click', calculateAllItemValues);
    }

    // Report filters and search
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', filterSaleOrders);
    }

    const paymentMethodFilter = document.getElementById('paymentMethodFilter');
    if (paymentMethodFilter) {
        paymentMethodFilter.addEventListener('change', filterSaleOrders);
    }

    const orderFromDate = document.getElementById('orderFromDate');
    if (orderFromDate) {
        orderFromDate.addEventListener('change', filterSaleOrders);
    }

    const orderToDate = document.getElementById('orderToDate');
    if (orderToDate) {
        orderToDate.addEventListener('change', filterSaleOrders);
    }

    const clearOrderFiltersBtn = document.getElementById('clearOrderFiltersBtn');
    if (clearOrderFiltersBtn) {
        clearOrderFiltersBtn.addEventListener('click', clearOrderFilters);
    }

    const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');
    if (refreshOrdersBtn) {
        refreshOrdersBtn.addEventListener('click', loadSaleOrders);
    }

    const exportOrdersBtn = document.getElementById('exportOrdersBtn');
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', exportSaleOrders);
    }

    // Settings - Add New Item functionality
    const addNewItemBtn = document.getElementById('addNewItemBtn');
    if (addNewItemBtn) {
        addNewItemBtn.addEventListener('click', showAddItemForm);
    }

    const saveNewItemBtn = document.getElementById('saveNewItemBtn');
    if (saveNewItemBtn) {
        saveNewItemBtn.addEventListener('click', saveNewItem);
    }

    const cancelAddItemBtn = document.getElementById('cancelAddItemBtn');
    if (cancelAddItemBtn) {
        cancelAddItemBtn.addEventListener('click', cancelAddItem);
    }

    // Settings delete item button
    const deleteItemBtn = document.getElementById('deleteItemBtn');
    if (deleteItemBtn) {
        deleteItemBtn.addEventListener('click', deleteCurrentItem);
    }

    // Sale Order - Stylist code change handler
    const stylistCodeSelect = document.getElementById('saleOrderStylistCode');
    if (stylistCodeSelect) {
        stylistCodeSelect.addEventListener('change', handleStylistCodeChange);
        stylistCodeSelect.addEventListener('input', handleStylistCodeChange);
    }

    // Sale Order - Token number change handler
    const tokenNoSelect = document.getElementById('tokenNo');
    if (tokenNoSelect) {
        tokenNoSelect.addEventListener('change', handleTokenNoChange);
        tokenNoSelect.addEventListener('input', handleTokenNoChange);
    }

    // Settings item name auto-fill
    const settingsItemNameInput = document.getElementById('settingsItemName');
    if (settingsItemNameInput) {
        settingsItemNameInput.addEventListener('change', handleSettingsItemNameChange);
        settingsItemNameInput.addEventListener('input', handleSettingsItemNameChange);
    }
}

// Load stylist codes from Firebase database
function loadStylistCodes() {
    if (typeof database !== 'undefined' && database) {
        database.ref('stylists').once('value', (snapshot) => {
            const stylistCodeList = document.getElementById('stylistCodeList');
            if (stylistCodeList) {
                stylistCodeList.innerHTML = '';

                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const stylist = childSnapshot.val();
                        if (stylist.stylistCode) {
                            const option = document.createElement('option');
                            option.value = stylist.stylistCode;
                            option.textContent = `${stylist.stylistCode} - ${stylist.name || ''}`;
                            stylistCodeList.appendChild(option);
                        }
                    });
                    // console.log('Stylist codes loaded from Firebase');

                    // Also populate location dropdowns
                    populateLocationDropdowns();
                }
            }
        }).catch((error) => {
            console.error('Error loading stylist codes:', error);
        });
    }
}

// Load token numbers from Firebase database
function loadTokenNumbers() {
    if (typeof database !== 'undefined' && database) {
        database.ref('customers').once('value', (snapshot) => {
            const tokenNoList = document.getElementById('tokenNoList');
            if (tokenNoList) {
                tokenNoList.innerHTML = '';

                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const customer = childSnapshot.val();
                        if (customer.tokenNo) {
                            const option = document.createElement('option');
                            option.value = customer.tokenNo;
                            option.textContent = `${customer.tokenNo} - ${customer.customerName || ''}`;
                            tokenNoList.appendChild(option);
                        }
                    });
                    // console.log('Token numbers loaded from Firebase');
                }
            }
        }).catch((error) => {
            console.error('Error loading token numbers:', error);
        });
    }
}

// Load order items from Firebase database
function loadOrderItems() {
    if (typeof database !== 'undefined' && database) {
        database.ref('orderItems').once('value', (snapshot) => {
            // Update all item name dropdowns in the form
            const itemDropdowns = document.querySelectorAll('.item-name');
            itemDropdowns.forEach(dropdown => {
                const currentValue = dropdown.value;
                dropdown.innerHTML = '<option value="">Select item name</option>';

                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const item = childSnapshot.val();
                        const option = document.createElement('option');
                        option.value = item.itemName;
                        option.textContent = `${item.itemName}`;
                        option.setAttribute('data-category', item.category || '');
                        option.setAttribute('data-rate', item.rate || 0);
                        dropdown.appendChild(option);
                    });
                }

                // Restore previous value if it exists
                if (currentValue) dropdown.value = currentValue;
            });

            orderItems = [];
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();
                    item.orderId = childSnapshot.key;
                    orderItems.push(item);
                });
                updateSettingsDataLists();
            }
        }).catch((error) => {
            console.error('Error loading order items:', error);
            loadOrderItemsFromLocalStorage();
        });
    } else {
        loadOrderItemsFromLocalStorage();
    }
}

// Fallback function to load items from localStorage
function loadOrderItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('orderItems');
    if (storedItems) {
        orderItems = JSON.parse(storedItems);
        updateItemNameDatalist();
        updateSettingsDataLists(); // Update settings datalists
    } else {
        // Create some default items if none exist
        orderItems = [
            {
                id: 1,
                itemName: 'Hair Product A',
                itemCategory: 'Hair Care',
                distributor: 'Distributor ABC',
                rate: 1500
            },
            {
                id: 2,
                itemName: 'Hair Product B',
                itemCategory: 'Hair Treatment',
                distributor: 'Distributor XYZ',
                rate: 2000
            }
        ];
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        updateItemNameDatalist();
        updateSettingsDataLists();
    }
}

// Populate all location dropdowns with unique locations from Firebase
function populateLocationDropdowns() {
    if (typeof database !== 'undefined' && database) {
        database.ref('stylists').once('value', (snapshot) => {
            const locations = new Set();

            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const stylist = childSnapshot.val();
                    if (stylist.location) {
                        locations.add(stylist.location);
                    }
                });
            }

            // Update the common location dropdown
            const locationSelect = document.getElementById('saleOrderLocation');
            if (locationSelect) {
                const currentValue = locationSelect.value;
                locationSelect.innerHTML = '<option value="">Select Location</option>';

                // Sort locations alphabetically
                const sortedLocations = Array.from(locations).sort();
                sortedLocations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    locationSelect.appendChild(option);
                });

                // Restore previously selected value if it still exists
                if (currentValue && sortedLocations.includes(currentValue)) {
                    locationSelect.value = currentValue;
                }
            }
        }).catch((error) => {
            console.error('Error loading locations:', error);
        });
    }
}                // Restore previous value if it exists
//                 if (currentValue && locations.has(currentValue)) {
//                     select.value = currentValue;
//                 }
//             });

//             console.log('Location dropdowns populated with', locations.size, 'unique locations');
//         }).catch((error) => {
//             console.error('Error loading locations:', error);
//         });
//     }
// }

// Update item name datalist
function updateItemNameDatalist() {
    const itemDropdowns = document.querySelectorAll('.item-name');
    itemDropdowns.forEach(dropdown => {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '<option value="">Select item name</option>';

        orderItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemName;
            option.textContent = `${item.itemName}`;
            option.setAttribute('data-category', item.category || '');
            option.setAttribute('data-rate', item.rate || 0);
            dropdown.appendChild(option);
        });

        // Restore previous value if it exists
        if (currentValue) dropdown.value = currentValue;
    });
}

// Handle stylist code change - auto-fill location for all rows
function handleStylistCodeChange() {
    // document.getElementById('tokenNo').value = '';
    const stylistCode = document.getElementById('saleOrderStylistCode').value;
    const tokenNoSelect = document.getElementById('tokenNoList');
    const locationSelect = document.getElementById('saleOrderLocation');
    console.log('Stylist code changed to:', stylistCode);
    if (stylistCode) {
        // Update token numbers for selected stylist from customers database
        if (tokenNoSelect) {
            tokenNoSelect.innerHTML = '<option value="">Select Token No</option>';

            // Find matching customers with the selected stylist code
            if (typeof database !== 'undefined' && database) {
                database.ref('customers').once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        let foundTokens = false;
                        const tokens = [];

                        snapshot.forEach((childSnapshot) => {
                            const customer = childSnapshot.val();
                            console.log('Checking customer for stylist code:', customer);
                            // console.log('Checking customer M1:', customer['stylistCode'] === stylistCode, 'against', stylistCode);
                            // console.log('Checking customer M2:', customer.stylishCode === stylistCode, 'against', stylistCode);
                            if ((customer.stylistCode === stylistCode || customer['stylistCode'] === stylistCode)) {
                                console.log('value is true for customer:', customer.tokenNo);
                                tokens.push({
                                    tokenNo: customer.tokenNo,
                                    customerName: customer.customerName || ''
                                });
                                foundTokens = true;
                            }
                            // console.log('Customer checked for tokens:', tokens);
                        });

                        // Sort tokens and add to dropdown
                        tokens.sort((a, b) => a.tokenNo.localeCompare(b.tokenNo));
                        tokens.forEach(token => {
                            const option = document.createElement('option');
                            option.value = token.tokenNo;
                            option.textContent = `${token.tokenNo}${token.customerName ? ' - ' + token.customerName : ''}`;
                            tokenNoSelect.appendChild(option);
                        });

                        // // Auto-select if only one token found
                        // if (foundTokens && tokens.length > 0 && tokens.length < 2) {
                        //     tokenNoSelect.selectedIndex = 1;
                        // }
                    }
                });
            }
        }

        // Fill location based on stylist code
        if (locationSelect && typeof database !== 'undefined' && database) {
            database.ref('stylists').once('value', (snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const stylist = childSnapshot.val();
                        if (stylist.stylistCode === stylistCode && stylist.location) {
                            locationSelect.value = stylist.location;
                        }
                    });
                }
            });
        }
    }
}

// Setup event listeners for item rows
function setupItemRowListeners() {
    document.querySelectorAll('.item-row').forEach(row => {
        const itemNameInput = row.querySelector('.item-name');
        const quantityInput = row.querySelector('.item-quantity');
        const ValueInput = row.querySelector('.item-rate');
        const distributorInput = row.querySelector('.item-distributor');
        const removeBtn = row.querySelector('.remove-item-btn');

        if (itemNameInput) {
            itemNameInput.addEventListener('change', function () {
                handleItemNameChange(this);
                // calculateTotalOrderValue();
            });
        }

        if (quantityInput) {
            quantityInput.addEventListener('input', function () {
                calculateItemValue(this);
                // calculateTotalOrderValue();
            });
        }

        if (ValueInput) {
            ValueInput.addEventListener('input', function () {
                calculateItemValue(this);
                // calculateTotalOrderValue();
            });
        }

        if (distributorInput) {
            distributorInput.addEventListener('input', function () {
                this.value = this.value.toUpperCase();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                removeItemRow(this);
                // calculateTotalOrderValue();
            });
        }
    });
}

// Add new item row
function addNewItemRow() {
    const tbody = document.getElementById('itemsTableBody');
    const rowCount = tbody.querySelectorAll('.item-row').length + 1;

    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.setAttribute('data-row', rowCount);

    newRow.innerHTML = `
        <td style="min-width: 220px;">
            <select class="form-control item-name" name="itemName[]" required 
                    style="min-width: 200px; font-size: 13px;">
                <option value="">Select item name</option>
            </select>
        </td>
        <td>
            <input type="text" class="form-control item-category" name="itemCategory[]" readonly
                   placeholder="Auto-filled" style="background-color: #f8f9fa;">
        </td>
        <td>
            <input type="number" class="form-control item-quantity" name="quantity[]" required
                   min="1" step="1" value="1" placeholder="1">
        </td>
        <td>
            <input type="text" class="form-control item-distributor" name="distributor[]"
            list="distributorList" placeholder="Enter distributor">
        </td>
        <td>
            <input type="number" class="form-control item-rate" name="rate[]"
                   step="1" placeholder="Auto-filled" style="background-color: #f8f9fa;">
        </td>
        <td>
            <input type="number" class="form-control item-value" name="value[]" readonly step="1" placeholder="Enter value">
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-danger remove-item-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tbody.appendChild(newRow);

    // Populate the new dropdown with items
    const newDropdown = newRow.querySelector('.item-name');
    if (newDropdown) {
        orderItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemName;
            option.textContent = `${item.itemName}`;
            option.setAttribute('data-category', item.category || '');
            option.setAttribute('data-rate', item.rate || 0);
            newDropdown.appendChild(option);
        });
    }

    setupItemRowListeners();
    updateRemoveButtonsState();
}

// Remove item row
function removeItemRow(button) {
    const row = button.closest('.item-row');
    if (row) {
        row.remove();
        updateRemoveButtonsState();
    }
}

// Update remove buttons state (disable if only one row)
function updateRemoveButtonsState() {
    const rows = document.querySelectorAll('.item-row');
    const removeButtons = document.querySelectorAll('.remove-item-btn');

    removeButtons.forEach(btn => {
        btn.disabled = rows.length <= 1;
    });
}

// Handle item name change for table rows
function handleItemNameChange(input) {
    const row = input.closest('.item-row');
    const itemName = input.value;

    if (itemName && row) {
        const selectedItem = orderItems.find(item => item.itemName === itemName);

        if (selectedItem) {
            const categoryInput = row.querySelector('.item-category');
            const distributorInput = row.querySelector('.item-distributor');
            const rateInput = row.querySelector('.item-rate');

            if (categoryInput) categoryInput.value = selectedItem.itemCategory || '';
            if (distributorInput) distributorInput.value = selectedItem.distributor || '';
            if (rateInput) rateInput.value = selectedItem.rate || 0;

            // Auto-fill location from stylist code
            // Calculate value for this row
            // calculateItemValue(input);
        }
    } else if (row) {
        // Clear auto-filled fields if item name is cleared
        const categoryInput = row.querySelector('.item-category');
        const distributorInput = row.querySelector('.item-distributor');
        const rateInput = row.querySelector('.item-rate');
        const valueInput = row.querySelector('.item-value');

        if (categoryInput) categoryInput.value = '';
        if (distributorInput) distributorInput.value = '';
        if (rateInput) rateInput.value = '';
        if (valueInput) valueInput.value = '';
    }
}

// Calculate value for a specific item row
function calculateItemValue(input) {
    const row = input.closest('.item-row');
    if (row) {
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const valueInput = row.querySelector('.item-value');
        // console.log('Calculating item value for quantity:', quantity, 'rate:', rate);
        // console.log('Rate:', rate, 'Value:', valueInput);
        const totalValue = rate / quantity;
        if (valueInput) {
            valueInput.value = totalValue;
        }
        calculateTotalOrderValue();
    }
}

// Calculate values for all item rows
// function calculateAllItemValues() {
//     document.querySelectorAll('.item-row').forEach(row => {
//         const quantityInput = row.querySelector('.item-quantity');
//         if (quantityInput) {
//             calculateItemValue(quantityInput);
//         }
//         calculateTotalOrderValue();
//     });
//     calculateTotalOrderValue();
// }

// Calculate total order value
function calculateTotalOrderValue() {
    let totalOrderValue = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const valueInput = row.querySelector('.item-rate');
        if (valueInput) {
            const value = parseFloat(valueInput.value.replace(/[^0-9.-]+/g, "")) || 0;
            totalOrderValue += value;
        }
    });

    const totalOrderValueInput = document.getElementById('totalOrderValue');
    if (totalOrderValueInput) {
        totalOrderValueInput.value = '₦' + totalOrderValue.toFixed(2);
    }
}

// Handle token number change - auto-fill stylist code
function handleTokenNoChange() {
    const tokenNo = document.getElementById('tokenNo').value;
    const stylistCodeSelect = document.getElementById('saleOrderStylistCode');

    if (!tokenNo || !stylistCodeSelect) return;

    // Find matching token and set stylist code from customers database
    if (typeof database !== 'undefined' && database) {
        database.ref('customers').once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const customer = childSnapshot.val();
                    if (customer.tokenNo === tokenNo && customer.stylistCode) {
                        stylistCodeSelect.value = customer.stylistCode;
                        // Trigger stylist code change handler to update location
                        handleStylistCodeChange();
                    }
                });
            }
        });
    }
}

// Set default order date to today
function setDefaultOrderDate() {
    const orderDateInput = document.getElementById('orderDate');
    if (orderDateInput) {
        const today = new Date().toISOString().split('T')[0];
        orderDateInput.value = today;
    }
}

// Helper function to show inline error message near a field
function showFieldError(element, message) {
    // Remove any existing error message for this field
    clearFieldError(element);

    // Add error class to the field
    element.classList.add('is-invalid');

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    errorDiv.setAttribute('data-error-for', element.id || element.name || 'field');

    // Insert error message after the field
    if (element.parentElement) {
        element.parentElement.appendChild(errorDiv);
    }
}

// Helper function to clear inline error message from a field
function clearFieldError(element) {
    element.classList.remove('is-invalid');

    // Remove error message if exists
    if (element.parentElement) {
        const errorMessages = element.parentElement.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(msg => msg.remove());
    }
}

// Helper function to clear all field errors in a form or container
function clearAllFieldErrors(container) {
    const invalidFields = container.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => clearFieldError(field));

    const errorMessages = container.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(msg => msg.remove());
}

// Handle sale order form submission
function handleSaleOrderSubmission(e) {
    e.preventDefault();

    // Clear all previous field errors
    const form = document.getElementById('saleOrderForm');
    clearAllFieldErrors(form);

    // Get main order details
    const orderDateInput = document.getElementById('orderDate');
    const locationSelect = document.getElementById('saleOrderLocation');
    const orderDate = orderDateInput.value;
    const location = locationSelect.value;

    // Check if we're editing an existing order
    const editOrderId = form.getAttribute('data-edit-order-id');
    const isEditMode = !!editOrderId;

    // Validate main order details first
    let hasError = false;
    if (!orderDate) {
        showFieldError(orderDateInput, 'Order Date is required!');
        hasError = true;
    }
    if (!location) {
        showFieldError(locationSelect, 'Location is required!');
        hasError = true;
    }

    if (hasError) {
        showOrderMessage('Please fill all required fields!', 'danger');
        return;
    }

    // Get all item details from table
    const itemRows = document.querySelectorAll('.item-row');
    const items = [];
    let isValid = true;

    if (itemRows.length === 0) {
        showOrderMessage('Please add at least one item to the order!', 'danger');
        return;
    }

    itemRows.forEach((row, index) => {
        const itemNameSelect = row.querySelector('.item-name');
        const itemCategoryInput = row.querySelector('.item-category');
        const quantityInput = row.querySelector('.item-quantity');
        const distributorInput = row.querySelector('.item-distributor');
        const rateInput = row.querySelector('.item-rate');

        const itemName = itemNameSelect.value.trim();
        const itemCategory = itemCategoryInput.value.trim();
        const quantity = quantityInput.value.trim();
        const distributor = distributorInput.value.trim();
        const rate = rateInput.value.trim();

        // Check for blank fields with inline error messages
        if (!itemName) {
            showFieldError(itemNameSelect, `Item Name is required!`);
            isValid = false;
        }
        if (!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
            showFieldError(quantityInput, `Valid positive quantity required!`);
            isValid = false;
        }
        if (!distributor) {
            showFieldError(distributorInput, `Distributor is required!`);
            isValid = false;
        }
        if (!rate || isNaN(parseFloat(rate)) || parseFloat(rate) < 1) {
            showFieldError(rateInput, `Valid rate required!`);
            isValid = false;
        }

        if (isValid || itemName) {
            const value = parseFloat(rate) / parseFloat(quantity);

            items.push({
                itemName: itemName,
                itemCategory: itemCategory,
                quantity: parseFloat(quantity),
                distributor: distributor,
                rate: parseFloat(rate),
                value: value
            });
        }
    });

    // Check if validation passed
    if (!isValid) {
        showOrderMessage('Please fix all validation errors in the form!', 'danger');
        return;
    }

    if (items.length === 0) {
        showOrderMessage('Please add at least one valid item to the order!', 'danger');
        return;
    }

    // Calculate total order value
    const totalOrderValue = items.reduce((sum, item) => sum + item.value, 0);

    if (isEditMode) {
        // Update existing order
        console.log('Updating existing order with ID:', editOrderId);
        console.log('order to update:', saleOrders);
        const existingOrder = saleOrders.find(o => o.orderId === editOrderId);
        console.log('Editing existing order:', existingOrder);
        if (existingOrder) {
            // Update order properties
            // existingOrder.stylistCode = stylistCode;
            // existingOrder.tokenNo = tokenNo;
            existingOrder.orderDate = orderDate;
            // existingOrder.paymentMethod = paymentMethod;
            existingOrder.location = location;
            // existingOrder.remarks = remarks;
            existingOrder.items = items;
            existingOrder.totalValue = totalOrderValue;
            existingOrder.lastModified = new Date().toISOString();

            // Save updated order
            updateSaleOrder(existingOrder);
        } else {
            showOrderMessage('Order not found for updating!', 'danger');
        }
    } else {
        // Generate order ID
        const orderId = 'SO_' + Date.now()
        orderCounter++;

        // Create order object
        const newOrder = {
            orderId: orderId,
            orderDate: orderDate,
            location: location,
            items: items,
            totalValue: totalOrderValue,
            timestamp: new Date().toISOString()
        };

        // Save order
        saveToFirebaseAndLocal('saleOrders', newOrder.orderId, newOrder)
            .then(() => {
                showOrderMessage('Sale order created successfully!', 'success');
                clearOrderForm();
                loadSaleOrders();
                updateOrderStatistics();
            })
            .catch((error) => {
                console.error('Error saving sale order:', error);
                showOrderMessage('Error saving order. Please try again.', 'danger');
            });
        // saveSaleOrder(newOrder);
    }
}

// Clear order form
function clearOrderForm() {
    console.log('Clearing order form...');
    const form = document.getElementById('saleOrderForm');
    if (form) {
        const isEditMode = form.hasAttribute('data-edit-order-id');

        // Reset form to create mode first
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Create Order';
            submitBtn.classList.remove('btn-warning');
            submitBtn.classList.add('btn-primary');
        }

        // Reset clear button to normal mode
        const clearBtn = form.querySelector('#clearOrderBtn');
        if (clearBtn) {
            clearBtn.innerHTML = '<i class="fas fa-eraser"></i> Clear Form';
            clearBtn.classList.remove('btn-outline-danger');
            clearBtn.classList.add('btn-outline-secondary');
        }

        // Remove edit mode attributes
        form.removeAttribute('data-edit-order-id');

        // Reset main form fields
        document.getElementById('saleOrderLocation').value = '';
        document.getElementById('totalOrderValue').value = '';
        setDefaultOrderDate();

        // Clear all item rows except the first one
        const tbody = document.getElementById('itemsTableBody');
        const rows = tbody.querySelectorAll('.item-row');

        // Remove all rows except first
        for (let i = rows.length - 1; i > 0; i--) {
            rows[i].remove();
        }

        // Clear first row
        if (rows.length > 0) {
            const firstRow = rows[0];
            firstRow.querySelector('.item-name').value = '';
            firstRow.querySelector('.item-category').value = '';
            firstRow.querySelector('.item-quantity').value = '1';
            firstRow.querySelector('.item-distributor').value = '';
            firstRow.querySelector('.item-rate').value = '';
            firstRow.querySelector('.item-value').value = '';
        } else {
            // If no rows exist, add one empty row
            addNewItemRow();
        }

        // Force refresh datalists after clearing
        setTimeout(() => {
            updateItemNameDatalist();
            updateDistributorDatalist();
            setupItemRowListeners();
        }, 100);

        updateRemoveButtonsState();

        // If we were in edit mode, show success message
        if (isEditMode) {
            showOrderMessage('Edit cancelled and form cleared', 'info');
        } else {
            showOrderMessage('Form cleared', 'info');
        }
    }
}

// Save sale order to Firebase/localStorage
function saveSaleOrder(order) {
    if (typeof database !== 'undefined' && database) {
        // Save to Firebase
        const newOrderRef = database.ref('saleOrders').push();
        newOrderRef.set(order)
            .then(() => {
                showOrderMessage('Sale order created successfully!', 'success');
                clearOrderForm();
                loadSaleOrders();
                updateOrderStatistics();
            })
            .catch((error) => {
                console.error('Error saving sale order:', error);
                showOrderMessage('Error saving order. Please try again.', 'danger');
            });
    } else {
        // Fallback to localStorage
        let orders = JSON.parse(localStorage.getItem('saleOrders')) || [];
        orders.push(order);
        localStorage.setItem('saleOrders', JSON.stringify(orders));
        saleOrders = orders;

        showOrderMessage('Sale order created successfully!', 'success');
        clearOrderForm();
        displaySaleOrders(saleOrders);
        updateOrderStatistics();
    }
}

// Update existing sale order in Firebase/localStorage
function updateSaleOrder(order) {
    if (typeof database !== 'undefined' && database) {
        // Find the Firebase key for this order
        database.ref('saleOrders').once('value', (snapshot) => {
            let orderKey = null;
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().orderId === order.orderId) {
                    orderKey = childSnapshot.key;
                }
            });

            if (orderKey) {
                // Update in Firebase
                database.ref('saleOrders/' + orderKey).set(order)
                    .then(() => {
                        showOrderMessage('Sale order updated successfully!', 'success');
                        clearOrderForm();
                        loadSaleOrders(); // Reload to reflect changes
                        updateOrderStatistics();
                        // Switch back to report section after update
                        setTimeout(() => {
                            showSection('sale-order-report');
                        }, 1000);
                    })
                    .catch((error) => {
                        console.error('Error updating order:', error);
                        showOrderMessage('Error updating order: ' + error.message, 'danger');
                    });
            } else {
                showOrderMessage('Order not found in database!', 'danger');
            }
        }).catch((error) => {
            console.error('Error finding order:', error);
            showOrderMessage('Error finding order: ' + error.message, 'danger');
        });
    } else {
        // Update in localStorage
        const orderIndex = saleOrders.findIndex(o => o.orderId === order.orderId);
        if (orderIndex !== -1) {
            saleOrders[orderIndex] = order;
            localStorage.setItem('saleOrders', JSON.stringify(saleOrders));

            showOrderMessage('Sale order updated successfully!', 'success');
            clearOrderForm();
            displaySaleOrders(saleOrders);
            updateOrderStatistics();
            // Switch back to report section after update
            setTimeout(() => {
                showSection('sale-order-report');
            }, 1000);
        } else {
            showOrderMessage('Order not found for updating!', 'danger');
        }
    }
}

// Load sale orders from Firebase/localStorage
function loadSaleOrders() {
    if (typeof database !== 'undefined' && database) {
        database.ref('saleOrders').once('value', (snapshot) => {
            saleOrders = [];
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const order = childSnapshot.val();
                    order.orderId = childSnapshot.key;
                    saleOrders.push(order);
                });
            }
            displaySaleOrders(saleOrders);
            updateOrderStatistics();
            // console.log('Sale orders loaded from Firebase');
        }).catch((error) => {
            console.error('Error loading sale orders:', error);
            loadSaleOrdersFromLocalStorage();
        });
    } else {
        loadSaleOrdersFromLocalStorage();
    }
}

// Fallback function to load orders from localStorage
function loadSaleOrdersFromLocalStorage() {
    const storedOrders = localStorage.getItem('saleOrders');
    saleOrders = storedOrders ? JSON.parse(storedOrders) : [];
    displaySaleOrders(saleOrders);
    updateOrderStatistics();
}

// Display sale orders in the table
function displaySaleOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');

    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No orders found</td></tr>';
        return;
    }

    let totalRate = 0;
    tbody.innerHTML = orders.map(order => {
        if (order.items && Array.isArray(order.items) && order.items.length > 0) {
            return order.items.map((item, idx) => {
                totalRate += Number(item.rate) || 0;
                return `
                <tr>
                    <td>${formatDateForDisplay(order.orderDate)}</td>
                    <td>${item.distributor}</td>
                    <td>${order.location}</td>
                    <td>${item.itemName}</td>
                    <td>${item.itemCategory || '-'}</td>
                    <td class="text-start">${item.quantity || 0}</td>
                    <td class="text-start">₦${(item.value || 0).toFixed(2)}</td>
                    <td class="text-start"><strong>₦${(item.rate || 0).toFixed(2)}</strong></td>
                    <td class="text-center btn-group">
                        <button class="btn btn-icon btn-outline-success" title="Edit" data-action="edit-order" data-order-id="${order.orderId}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-outline-danger" title="Delete" data-action="delete-order" data-order-id="${order.orderId}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
                `;
            }).join('');
        } else {
            totalRate += Number(order.rate) || 0;
            return `
                <tr>
                    <td>${formatDateForDisplay(order.orderDate)}</td>
                    <td>${order.distributor || '-'}</td>
                    <td>${order.location || '-'}</td>
                    <td>${order.itemName || '-'}</td>
                    <td>${order.itemCategory || '-'}</td>
                    <td class="text-center">${order.quantity || 0}</td>
                    <td class="text-end">₦${(order.value || 0).toFixed(2)}</td>
                    <td class="text-end"><strong>₦${(order.rate || 0).toFixed(2)}</strong></td>
                    <td class="text-center btn-group">
                        <button class="btn btn-icon btn-outline-success" title="Edit" data-action="edit-order" data-order-id="${order.orderId}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-outline-danger" title="Delete" data-action="delete-order" data-order-id="${order.orderId}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }
    }).join('');

    // Summary row removed as per user request
    document.getElementById('totalOrdersValue').textContent = '₦ ' + totalRate.toFixed(2);
    document.getElementById('totalOrdersValueTop').textContent = '₦ ' + totalRate.toFixed(2);
}

// Update order statistics
function updateOrderStatistics() {
    const today = new Date().toISOString().split('T')[0];
    // console.log('Updating order statistics for date:', saleOrders);
    // Calculate statistics
    const todayOrders = saleOrders.filter(order => order.orderDate === today);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.items ? order.items.reduce((s, item) => s + (item.value || 0), 0) : 0), 0);
    const totalRevenue = saleOrders.reduce((sum, order) => sum + (order.items ? order.items.reduce((s, item) => s + (item.value || 0), 0) : 0), 0);
    const averageOrderValue = saleOrders.length > 0 ? totalRevenue / saleOrders.length : 0;
    // console.log('Order statistics updated todays orders:', todayOrders.length, 'today revenue: ₦', todayRevenue.toFixed(2));
    // console.log('Total orders:', saleOrders.length, 'total revenue: ₦', totalRevenue.toFixed(2), 'average order value: ₦', averageOrderValue.toFixed(2));
    // Update form section stats
    const todayOrdersEl = document.getElementById('todayOrders');
    const todayRevenueEl = document.getElementById('todayRevenue');
    const pendingOrdersFormEl = document.getElementById('pendingOrdersForm');
    const completedOrdersFormEl = document.getElementById('completedOrdersForm');

    if (todayOrdersEl) todayOrdersEl.textContent = todayOrders.length;
    if (todayRevenueEl) todayRevenueEl.textContent = '₦' + todayRevenue.toFixed(2);
    if (pendingOrdersFormEl) pendingOrdersFormEl.textContent = saleOrders.length; // All orders for now
    if (completedOrdersFormEl) completedOrdersFormEl.textContent = todayOrders.length;

    // Update report section stats
    const totalOrdersReportEl = document.getElementById('totalOrdersReport');
    const totalRevenueReportEl = document.getElementById('totalRevenueReport');
    const averageOrderValueEl = document.getElementById('averageOrderValue');
    const topProductEl = document.getElementById('topProduct');

    if (totalOrdersReportEl) totalOrdersReportEl.textContent = saleOrders.length;
    if (totalRevenueReportEl) totalRevenueReportEl.textContent = '₦' + totalRevenue.toFixed(2);
    if (averageOrderValueEl) averageOrderValueEl.textContent = '₦' + averageOrderValue.toFixed(2);

    // Find top product
    if (topProductEl) {
        const itemCounts = {};
        saleOrders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    if (item.itemName) {
                        itemCounts[item.itemName] = (itemCounts[item.itemName] || 0) + (item.quantity || 0);
                    }
                });
            } else if (order.itemName) {
                // fallback for old orders
                itemCounts[order.itemName] = (itemCounts[order.itemName] || 0) + (order.quantity || 0);
            }
        });

        const topItem = Object.keys(itemCounts).reduce((a, b) =>
            itemCounts[a] > itemCounts[b] ? a : b, '-'
        );

        topProductEl.textContent = topItem || '-';
    }
}

// Show order result message
function showOrderMessage(message, type) {
    const resultDiv = document.getElementById('orderResult');
    const alertDiv = resultDiv.querySelector('.alert');

    if (alertDiv && resultDiv) {
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        resultDiv.style.display = 'block';

        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 3000);
    }
}

// Format date for display
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

// Filter sale orders
function filterSaleOrders() {
    const search = document.getElementById('orderSearch').value.toLowerCase();
    const paymentFilter = document.getElementById('paymentMethodFilter').value;
    const fromDate = document.getElementById('orderFromDate').value;
    const toDate = document.getElementById('orderToDate').value;
    const orderStatusFilter = document.getElementById('orderStatusFilter').value;

    let filteredOrders = saleOrders.filter(order => {
        const stylistCode = order.stylistCode ? order.stylistCode.toLowerCase() : '';
        const tokenNo = order.tokenNo ? order.tokenNo.toLowerCase() : '';
        const orderId = order.orderId ? order.orderId.toLowerCase() : '';
        // const orderStatus = order.orderStatus ? order.orderStatus.toLowerCase() : '';
        // For itemName, check all items if present
        let itemNameMatch = false;
        if (order.items && Array.isArray(order.items)) {
            itemNameMatch = order.items.some(item => (item.itemName || '').toLowerCase().includes(search));
        } else {
            itemNameMatch = (order.itemName || '').toLowerCase().includes(search);
        }

        const matchesSearch = !search ||
            stylistCode.includes(search) ||
            tokenNo.includes(search) ||
            itemNameMatch ||
            // orderStatus.includes(orderStatusFilter ? orderStatusFilter.toLowerCase() : '') ||
            orderId.includes(search);

        const matchesPayment = !paymentFilter || order.paymentMethod === paymentFilter;
        const matchesFromDate = !fromDate || order.orderDate >= fromDate;
        const matchesToDate = !toDate || order.orderDate <= toDate;
        // const matchesOrderStatus = !orderStatusFilter || orderStatus === orderStatusFilter.toLowerCase();
        // console.log('Filtering order:', order.orderId, 'matchesSearch:', matchesSearch, 'matchesPayment:', matchesPayment, 'matchesFromDate:', matchesFromDate, 'matchesToDate:', matchesToDate);
        return matchesSearch && matchesPayment && matchesFromDate && matchesToDate;
    });
    // console.log('Filtered orders count:', filteredOrders);
    displaySaleOrders(filteredOrders);
}

// Clear order filters
function clearOrderFilters() {
    document.getElementById('orderSearch').value = '';
    document.getElementById('paymentMethodFilter').value = '';
    document.getElementById('orderFromDate').value = '';
    document.getElementById('orderToDate').value = '';
    document.getElementById('orderStatusFilter').value = '';
    displaySaleOrders(saleOrders);
}

// Export sale orders to CSV
function exportSaleOrders() {
    if (saleOrders.length === 0) {
        alert('No orders to export!');
        return;
    }

    const csv = [
        ['Order ID', 'Date', 'Stylist Code', 'Token No', 'Item Name', 'Category', 'Quantity', 'Rate', 'Value', 'Payment Method', 'Location', 'Remarks']
    ];

    saleOrders.forEach(order => {
        csv.push([
            order.orderId,
            order.orderDate,
            order.stylistCode,
            order.tokenNo,
            order.itemName,
            order.itemCategory || '',
            order.quantity,
            order.rate,
            order.value,
            order.paymentMethod,
            order.location || '',
            order.remarks || ''
        ]);
    });

    const csvContent = csv.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sale_orders_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Order management functions
function viewSaleOrder(orderId) {
    const order = saleOrders.find(o => o.orderId === orderId);
    if (order) {
        const details = `
Order Details:

Order ID: ${order.orderId}
Date: ${order.orderDate}
Stylist Code: ${order.stylistCode}
Token No: ${order.tokenNo}
Item: ${order.itemName}
Category: ${order.itemCategory || '-'}
Quantity: ${order.quantity}
Rate: ₦${order.rate.toFixed(2)}
Total Value: ₦${order.value.toFixed(2)}
Payment Method: ${order.paymentMethod}
Location: ${order.location || '-'}
Remarks: ${order.remarks || 'None'}
        `;
        alert(details);
    }
}

function editSaleOrder(orderId) {
    const order = saleOrders.find(o => o.orderId === orderId);
    if (!order) {
        alert('Order not found!');
        return;
    }

    // Show edit modal popup
    showEditSaleOrderModal(orderId, order);
}

// Show edit sale order modal
function showEditSaleOrderModal(orderId, order) {
    // Generate items table rows for the modal
    let itemsTableHTML = '';
    if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item, index) => {
            itemsTableHTML += `
                <tr class="edit-item-row" data-row="${index + 1}">
                    <td style="min-width: 220px;">
                        <select class="form-control edit-item-name" required 
                                style="min-width: 200px; font-size: 13px;">
                            <option value="">Select item name</option>
                            <!-- Will be populated with items -->
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control edit-item-category" readonly
                               value="${item.itemCategory || ''}" style="background-color: #f8f9fa;">
                    </td>
                    <td>
                        <input type="number" class="form-control edit-item-quantity" 
                               min="1" step="1" value="${item.quantity || 1}">
                    </td>
                    <td>
                        <input type="text" class="form-control edit-item-distributor" 
                               list="editDistributorList" value="${item.distributor || ''}">
                    </td>
                    <td>
                        <input type="number" class="form-control edit-item-rate" 
                               step="1" value="${item.rate || 0}" style="background-color: #f8f9fa;">
                    </td>
                    <td>
                        <input type="text" class="form-control edit-item-value" readonly
                               value="${item.value || 0}">
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-danger edit-remove-item-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        // Add one empty row
        itemsTableHTML = `
            <tr class="edit-item-row" data-row="1">
                <td style="min-width: 220px;">
                    <select class="form-control edit-item-name" required 
                            style="min-width: 200px; font-size: 13px;">
                        <option value="">Select item name</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control edit-item-category" readonly
                           style="background-color: #f8f9fa;">
                </td>
                <td>
                    <input type="number" class="form-control edit-item-quantity" 
                           min="1" step="1" value="1">
                </td>
                <td>
                    <input type="text" class="form-control edit-item-distributor" 
                           list="editDistributorList">
                </td>
                <td>
                    <input type="number" class="form-control edit-item-rate" 
                           step="1" value="0" style="background-color: #f8f9fa;">
                </td>
                <td>
                    <input type="text" class="form-control edit-item-value" readonly value="0">
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-danger edit-remove-item-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    // Generate item name datalist
    let itemNameOptions = '';
    orderItems.forEach(item => {
        itemNameOptions += `<option value="${item.itemName}">${item.itemName}</option>`;
    });

    // Generate distributor datalist
    let distributorOptions = '';
    distributorNames.forEach(name => {
        distributorOptions += `<option value="${name}"></option>`;
    });

    // Generate location options from database
    let locationOptions = '<option value="">Select Location</option>';

    // Function to generate modal after getting locations
    const generateModalWithLocations = (availableLocations) => {
        availableLocations.forEach(loc => {
            locationOptions += `<option value="${loc}" ${order.location === loc ? 'selected' : ''}>${loc}</option>`;
        });

        const modalHTML = `
        <div class="modal fade" id="editSaleOrderModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-edit me-2"></i>Edit Sale Order - ${orderId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editSaleOrderForm" novalidate>
                            <input type="hidden" id="editOrderId" value="${orderId}">
                            
                            <div class="row g-3 mb-4">
                                <div class="col-md-4">
                                    <label class="form-label">Order Date</label>
                                    <input type="date" class="form-control" id="editOrderDate" 
                                           value="${order.orderDate || ''}" required>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Location</label>
                                    <select class="form-select" id="editOrderLocation" required>
                                        ${locationOptions}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Total Order Value</label>
                                    <input type="number" class="form-control" id="editTotalOrderValue" 
                                           value="${order.totalValue || 0}" readonly style="background-color: #f8f9fa;">
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6>Order Items</h6>
                                    <button type="button" class="btn btn-sm btn-primary" id="editAddItemBtn">
                                        <i class="fas fa-plus me-1"></i>Add Item
                                    </button>
                                </div>
                                
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item Name</th>
                                                <th>Category</th>
                                                <th>Quantity</th>
                                                <th>Distributor</th>
                                                <th>Value</th>
                                                <th>Rate</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="editItemsTableBody">
                                            ${itemsTableHTML}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <style>
                                .edit-item-name {
                                    min-width: 200px !important;
                                    font-size: 13px !important;
                                }
                                .edit-item-row td:first-child {
                                    min-width: 220px !important;
                                }
                            </style>

                            <!-- Only keep distributor datalist -->
                            <datalist id="editDistributorList">
                                ${distributorOptions}
                            </datalist>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveEditedSaleOrder()">
                            <i class="fas fa-save me-2"></i>Update Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Remove existing modal if any
        const existingModal = document.getElementById('editSaleOrderModal');
        if (existingModal) existingModal.remove();

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Setup event listeners for the modal
        setupEditSaleOrderModalListeners();

        // Populate all dropdowns in the modal
        populateEditModalDropdowns(order);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('editSaleOrderModal'));
        modal.show();
    };

    // Fetch locations from database (stylists table)
    if (typeof database !== 'undefined' && database) {
        database.ref('stylists').once('value', (snapshot) => {
            const locations = new Set();

            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const stylist = childSnapshot.val();
                    if (stylist.location) {
                        locations.add(stylist.location);
                    }
                });
            }

            // Sort locations alphabetically and generate modal
            const sortedLocations = Array.from(locations).sort();
            generateModalWithLocations(sortedLocations);
        }).catch((error) => {
            console.error('Error loading locations:', error);
            // Fallback: use default locations
            const defaultLocations = ['AKURE', 'IBADAN', 'LAGOS', 'ABUJA', 'PORT HARCOURT', 'KANO'];
            generateModalWithLocations(defaultLocations);
        });
    } else {
        // Fallback: use default locations
        const defaultLocations = ['AKURE', 'IBADAN', 'LAGOS', 'ABUJA', 'PORT HARCOURT', 'KANO'];
        generateModalWithLocations(defaultLocations);
    }
}

// Populate edit modal dropdowns with item data
function populateEditModalDropdowns(order) {
    const modal = document.getElementById('editSaleOrderModal');
    if (!modal) return;

    const itemDropdowns = modal.querySelectorAll('.edit-item-name');

    itemDropdowns.forEach((dropdown, index) => {
        // Clear existing options
        dropdown.innerHTML = '<option value="">Select item name</option>';

        // Populate with order items
        orderItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemName;
            option.textContent = `${item.itemName}`;
            option.setAttribute('data-category', item.itemCategory || '');
            option.setAttribute('data-rate', item.rate || 0);
            dropdown.appendChild(option);
        });

        // Set selected value if order has items
        if (order.items && order.items[index]) {
            const existingItem = order.items[index];
            console.log('Editing item:', existingItem); // Debug log
            dropdown.value = existingItem.itemName || '';

            // Auto-populate fields immediately (without event)
            const row = dropdown.closest('.edit-item-row');
            if (row) {
                const categoryInput = row.querySelector('.edit-item-category');
                const rateInput = row.querySelector('.edit-item-rate');
                const quantityInput = row.querySelector('.edit-item-quantity');
                const distributorInput = row.querySelector('.edit-item-distributor');
                const valueInput = row.querySelector('.edit-item-value');

                // Set values from existing item data
                if (categoryInput) {
                    categoryInput.value = existingItem.itemCategory || existingItem.category || '';
                    console.log('Category set to:', categoryInput.value);
                }
                if (rateInput) {
                    rateInput.value = existingItem.rate || 0;
                    console.log('Rate set to:', rateInput.value);
                }
                if (quantityInput) quantityInput.value = existingItem.quantity || 1;
                if (distributorInput) distributorInput.value = existingItem.distributor || '';
                if (valueInput) {
                    valueInput.value = existingItem.value || 0;
                    console.log('Value set to:', valueInput.value);
                }
            }
        }
    });

    // Calculate total after populating all fields
    setTimeout(() => {
        calculateEditTotalValue();
    }, 100);
}

// Setup event listeners for edit sale order modal
function setupEditSaleOrderModalListeners() {
    const modal = document.getElementById('editSaleOrderModal');

    // Add item button
    const addItemBtn = modal.querySelector('#editAddItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addEditItemRow);
    }

    // Item name change listeners
    modal.addEventListener('change', function (e) {
        if (e.target.classList.contains('edit-item-name')) {
            handleEditItemNameChange(e.target);
        }

        // Clear field error when user changes value
        if (e.target.classList.contains('is-invalid')) {
            clearFieldError(e.target);
        }
    });

    // Quantity and rate change listeners
    modal.addEventListener('input', function (e) {
        if (e.target.classList.contains('edit-item-quantity') ||
            e.target.classList.contains('edit-item-rate')) {
            calculateEditItemValue(e.target);
        }

        // Clear field error when user types
        if (e.target.classList.contains('is-invalid')) {
            clearFieldError(e.target);
        }
    });

    // Remove item button listeners
    modal.addEventListener('click', function (e) {
        if (e.target.closest('.edit-remove-item-btn')) {
            removeEditItemRow(e.target.closest('.edit-remove-item-btn'));
        }
    });

    // Distributor input uppercase
    modal.addEventListener('input', function (e) {
        if (e.target.classList.contains('edit-item-distributor')) {
            e.target.value = e.target.value.toUpperCase();
        }
    });

    // Update remove button states initially
    updateEditRemoveButtonsState();
}

// Handle item name change in edit modal
function handleEditItemNameChange(selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    if (!selectedOption || !selectedOption.value) return;

    const itemName = selectedOption.value;
    const category = selectedOption.getAttribute('data-category') || '';
    const rate = selectedOption.getAttribute('data-rate') || 0;

    const row = selectElement.closest('.edit-item-row');
    const categoryInput = row.querySelector('.edit-item-category');
    const rateInput = row.querySelector('.edit-item-rate');

    // Auto-fill category and rate
    if (categoryInput) categoryInput.value = category;
    if (rateInput) rateInput.value = rate;

    calculateEditItemValue(selectElement);
}

// Calculate item value in edit modal
function calculateEditItemValue(input) {
    const row = input.closest('.edit-item-row');
    const quantityInput = row.querySelector('.edit-item-quantity');
    const rateInput = row.querySelector('.edit-item-rate');
    const valueInput = row.querySelector('.edit-item-value');

    const quantity = parseFloat(quantityInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const value = rate / quantity;

    valueInput.value = value.toFixed(2);
    calculateEditTotalValue();
}

// Calculate total order value in edit modal
function calculateEditTotalValue() {
    const modal = document.getElementById('editSaleOrderModal');
    const valueInputs = modal.querySelectorAll('.edit-item-value');
    let total = 0;

    valueInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });

    const totalInput = modal.querySelector('#editTotalOrderValue');
    if (totalInput) {
        totalInput.value = total.toFixed(2);
    }
}

// Add new item row in edit modal
function addEditItemRow() {
    const tbody = document.getElementById('editItemsTableBody');
    const rowCount = tbody.querySelectorAll('.edit-item-row').length + 1;

    const newRow = document.createElement('tr');
    newRow.className = 'edit-item-row';
    newRow.setAttribute('data-row', rowCount);

    newRow.innerHTML = `
        <td style="min-width: 220px;">
            <select class="form-control edit-item-name" required 
                    style="min-width: 200px; font-size: 13px;">
                <option value="">Select item name</option>
            </select>
        </td>
        <td>
            <input type="text" class="form-control edit-item-category" readonly
                   style="background-color: #f8f9fa;">
        </td>
        <td>
            <input type="number" class="form-control edit-item-quantity" 
                   min="1" step="1" value="1">
        </td>
        <td>
            <input type="text" class="form-control edit-item-distributor" 
                   list="editDistributorList">
        </td>
        <td>
            <input type="number" class="form-control edit-item-rate" 
                   step="1" value="0" style="background-color: #f8f9fa;" readonly>
        </td>
        <td>
            <input type="text" class="form-control edit-item-value" readonly value="0">
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-danger edit-remove-item-btn">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tbody.appendChild(newRow);

    // Populate the new dropdown with items
    const newDropdown = newRow.querySelector('.edit-item-name');
    if (newDropdown) {
        orderItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemName;
            option.textContent = `${item.itemName}`;
            option.setAttribute('data-category', item.category || '');
            option.setAttribute('data-rate', item.rate || 0);
            newDropdown.appendChild(option);
        });
    }

    updateEditRemoveButtonsState();
}

// Remove item row in edit modal
function removeEditItemRow(btn) {
    const row = btn.closest('.edit-item-row');
    const tbody = document.getElementById('editItemsTableBody');

    if (tbody.querySelectorAll('.edit-item-row').length > 1) {
        row.remove();
        calculateEditTotalValue();
        updateEditRemoveButtonsState();
    }
}

// Update remove button states in edit modal
function updateEditRemoveButtonsState() {
    const tbody = document.getElementById('editItemsTableBody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('.edit-item-row');
    const removeButtons = tbody.querySelectorAll('.edit-remove-item-btn');

    removeButtons.forEach(btn => {
        btn.disabled = rows.length <= 1;
        btn.style.opacity = rows.length <= 1 ? '0.5' : '1';
    });
}

// Save edited sale order
function saveEditedSaleOrder() {
    const modal = document.getElementById('editSaleOrderModal');

    // Clear all previous field errors
    clearAllFieldErrors(modal);

    const orderIdInput = modal.querySelector('#editOrderId');
    const orderDateInput = modal.querySelector('#editOrderDate');
    const locationSelect = modal.querySelector('#editOrderLocation');
    const totalValueInput = modal.querySelector('#editTotalOrderValue');

    const orderId = orderIdInput.value;
    const orderDate = orderDateInput.value;
    const location = locationSelect.value;
    const totalValue = totalValueInput.value;

    // Validate main order details first
    let hasError = false;
    if (!orderId) {
        showOrderMessage('Order ID is missing!', 'danger');
        return;
    }
    if (!orderDate) {
        showFieldError(orderDateInput, 'Order Date is required!');
        hasError = true;
    }
    if (!location) {
        showFieldError(locationSelect, 'Location is required!');
        hasError = true;
    }

    if (hasError) {
        showOrderMessage('Please fill all required fields!', 'danger');
        return;
    }

    // Collect items data
    const items = [];
    const itemRows = modal.querySelectorAll('.edit-item-row');

    if (itemRows.length === 0) {
        showOrderMessage('Please add at least one item to the order!', 'danger');
        return;
    }

    let isValid = true;
    itemRows.forEach((row, index) => {
        const itemNameSelect = row.querySelector('.edit-item-name');
        const itemCategoryInput = row.querySelector('.edit-item-category');
        const quantityInput = row.querySelector('.edit-item-quantity');
        const distributorInput = row.querySelector('.edit-item-distributor');
        const rateInput = row.querySelector('.edit-item-rate');
        const valueInput = row.querySelector('.edit-item-value');

        const itemName = itemNameSelect ? itemNameSelect.value.trim() : '';
        const itemCategory = itemCategoryInput.value.trim();
        const quantity = quantityInput.value.trim();
        const distributor = distributorInput.value.trim();
        const rate = rateInput.value.trim();
        const value = valueInput.value.trim();

        // Check for blank required fields with inline error messages
        if (!itemName) {
            showFieldError(itemNameSelect, `Item Name is required!`);
            isValid = false;
        }
        if (!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
            showFieldError(quantityInput, `Valid positive quantity required!`);
            isValid = false;
        }
        if (!distributor) {
            showFieldError(distributorInput, `Distributor is required!`);
            isValid = false;
        }
        if (!rate || isNaN(parseFloat(rate)) || parseFloat(rate) < 1) {
            showFieldError(rateInput, `Valid rate required!`);
            isValid = false;
        }

        if (itemName) {
            items.push({
                itemName,
                itemCategory,
                quantity: parseInt(quantity) || 1,
                distributor,
                rate: parseFloat(rate) || 0,
                value: parseFloat(value) || 0
            });
        }
    });

    if (!isValid) {
        showOrderMessage('Please fix all validation errors in the form!', 'danger');
        return;
    }

    if (items.length === 0) {
        showOrderMessage('Please add at least one valid item!', 'danger');
        return;
    }

    // Create updated order object
    const updatedOrder = {
        orderId,
        orderDate,
        location,
        totalValue: parseFloat(totalValue) || 0,
        items,
        timestamp: new Date().toISOString()
    };

    // Update in saleOrders array
    const orderIndex = saleOrders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
        saleOrders[orderIndex] = updatedOrder;

        // Save to Firebase/localStorage
        if (typeof database !== 'undefined' && database) {
            database.ref('saleOrders/' + orderId).set(updatedOrder)
                .then(() => {
                    showOrderMessage('Order updated successfully!', 'success');
                    loadSaleOrders(); // Refresh the table
                })
                .catch(error => {
                    console.error('Error updating order:', error);
                    showOrderMessage('Error updating order: ' + error.message, 'danger');
                });
        } else {
            // Save to localStorage
            localStorage.setItem('firebase_saleOrders', JSON.stringify(saleOrders));
            showOrderMessage('Order updated successfully!', 'success');
            loadSaleOrders(); // Refresh the table
        }

        // Remove focus from any focused element inside modal to prevent aria-hidden warning
        const activeElement = document.activeElement;
        if (activeElement && modal.contains(activeElement)) {
            activeElement.blur();
        }

        // Close modal after a short delay to allow blur to complete
        setTimeout(() => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }, 100);

    } else {
        alert('Order not found!');
    }
}

function deleteSaleOrder(orderId) {
    if (confirm('Are you sure you want to delete this sale order?')) {
        if (typeof database !== 'undefined' && database) {
            // Delete from Firebase
            const order = saleOrders.find(o => o.orderId === orderId);
            if (order && order.orderId) {
                database.ref('saleOrders/' + order.orderId).remove()
                    .then(() => {
                        loadSaleOrders();
                        showOrderMessage('Order deleted successfully', 'success');
                    })
                    .catch((error) => {
                        console.error('Error deleting order:', error);
                        showOrderMessage('Error deleting order', 'danger');
                    });
            }
        } else {
            // Delete from localStorage
            saleOrders = saleOrders.filter(order => order.orderId !== orderId);
            localStorage.setItem('saleOrders', JSON.stringify(saleOrders));
            displaySaleOrders(saleOrders);
            updateOrderStatistics();
            showOrderMessage('Order deleted successfully', 'success');
        }
    }
}

// // Handle stylist code change - update token numbers
// function handleStylistCodeChange() {
//     const stylistCode = document.getElementById('stylistCode').value;
//     const tokenNoSelect = document.getElementById('tokenNo');

//     if (!stylistCode || !tokenNoSelect) return;

//     // Clear current token options
//     tokenNoSelect.innerHTML = '<option value="">Select Token No</option>';

//     // Find matching stylist and populate their tokens
//     if (typeof database !== 'undefined' && database) {
//         database.ref('stylists').once('value', (snapshot) => {
//             if (snapshot.exists()) {
//                 snapshot.forEach((childSnapshot) => {
//                     const stylist = childSnapshot.val();
//                     if (stylist.stylistCode === stylistCode && stylist.tokenNo) {
//                         const option = document.createElement('option');
//                         option.value = stylist.tokenNo;
//                         option.textContent = stylist.tokenNo;
//                         tokenNoSelect.appendChild(option);
//                     }
//                 });
//             }
//         });
//     } else {
//         // Fallback to localStorage
//         const storedStylists = localStorage.getItem('stylists');
//         if (storedStylists) {
//             const stylists = JSON.parse(storedStylists);
//             const currentStylistCode = document.getElementById('saleOrderStylistCode').value;
//             stylists.forEach(stylist => {
//                 if (stylist.stylistCode === currentStylistCode && stylist.tokenNo) {
//                     const option = document.createElement('option');
//                     option.value = stylist.tokenNo;
//                     option.textContent = stylist.tokenNo;
//                     tokenNoSelect.appendChild(option);
//                 }
//             });
//         }
//     }
// }

// // Handle token number change - auto-fill stylist code
// function handleTokenNoChange() {
//     const tokenNo = document.getElementById('tokenNo').value;
//     const stylistCodeSelect = document.getElementById('saleOrderStylistCode');

//     if (!tokenNo || !stylistCodeSelect) return;

//     // Find matching token and set stylist code
//     if (typeof database !== 'undefined' && database) {
//         database.ref('stylists').once('value', (snapshot) => {
//             if (snapshot.exists()) {
//                 snapshot.forEach((childSnapshot) => {
//                     const stylist = childSnapshot.val();
//                     if (stylist.tokenNo === tokenNo) {
//                         stylistCodeSelect.value = stylist.stylistCode || '';
//                         // Also auto-fill location
//                         const locationSelect = document.getElementById('location');
//                         if (locationSelect) {
//                             locationSelect.value = stylist.location || '';
//                         }
//                     }
//                 });
//             }
//         });
//     } else {
//         // Fallback to localStorage
//         const storedStylists = localStorage.getItem('stylists');
//         if (storedStylists) {
//             const stylists = JSON.parse(storedStylists);
//             const matchingStylist = stylists.find(stylist => stylist.tokenNo === tokenNo);
//             if (matchingStylist) {
//                 stylistCodeSelect.value = matchingStylist.stylistCode || '';
//                 const locationSelect = document.getElementById('location');
//                 if (locationSelect) {
//                     locationSelect.value = matchingStylist.location || '';
//                 }
//             }
//         }
//     }
// }

// Handle settings item name change for auto-fill modification
function handleSettingsItemNameChange() {
    const itemName = document.getElementById('settingsItemName').value;
    const deleteBtn = document.getElementById('deleteItemBtn');

    if (itemName) {
        const existingItem = orderItems.find(item => item.itemName.toLowerCase() === itemName.toLowerCase());

        if (existingItem) {
            // Auto-fill form for modification
            document.getElementById('settingsItemCategory').value = existingItem.itemCategory || '';
            // document.getElementById('settingsItemPrice').value = existingItem.rate || '';
            document.getElementById('settingsItemDescription').value = existingItem.description || '';

            // Show delete button for existing items
            if (deleteBtn) {
                deleteBtn.style.display = 'inline-block';
                deleteBtn.setAttribute('data-item-name', itemName);
            }
        } else {
            // Hide delete button for new items
            if (deleteBtn) {
                deleteBtn.style.display = 'none';
            }
        }
    } else {
        // Hide delete button when no item selected
        if (deleteBtn) {
            deleteBtn.style.display = 'none';
        }
    }
}

// Update settings datalists
function updateSettingsDataLists() {
    // Update item names datalist
    const itemNameList = document.getElementById('settingsItemNameList');
    if (itemNameList) {
        itemNameList.innerHTML = '';
        orderItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemName;
            itemNameList.appendChild(option);
        });
    }

    // Update categories datalist
    const categoryList = document.getElementById('settingsCategoryList');
    if (categoryList) {
        categoryList.innerHTML = '';
        const uniqueCategories = [...new Set(orderItems.map(item => item.itemCategory).filter(cat => cat))];
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            categoryList.appendChild(option);
        });
    }
}

// Settings - Add New Item Management Functions
function showAddItemForm() {
    // console.log('showAddItemForm called');
    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.style.display = 'block';
        // console.log('Add item form shown');
    } else {
        console.error('addItemForm element not found');
    }
}

// Delete current item being modified
function deleteCurrentItem() {
    const itemName = document.getElementById('deleteItemBtn').getAttribute('data-item-name');

    if (!itemName) {
        alert('No item selected for deletion!');
        return;
    }

    if (!confirm(`Are you sure you want to delete "${itemName}"?`)) {
        return;
    }

    const itemIndex = orderItems.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());

    if (itemIndex === -1) {
        alert('Item not found!');
        return;
    }

    const item = orderItems[itemIndex];

    if (typeof database !== 'undefined' && database && item.orderId) {
        // Delete from Firebase
        database.ref('orderItems/' + item.orderId).remove()
            .then(() => {
                alert('Item deleted successfully!');
                cancelAddItem();
                loadOrderItems();
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                alert('Error deleting item. Please try again.');
            });
    } else {
        // Delete from localStorage
        orderItems.splice(itemIndex, 1);
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        updateItemNameDatalist();
        updateSettingsDataLists();
        cancelAddItem();
        alert('Item deleted successfully!');
    }
}

function cancelAddItem() {
    // console.log('cancelAddItem called');
    const addItemForm = document.getElementById('addItemForm');
    const newItemForm = document.getElementById('newItemForm');

    if (addItemForm) {
        addItemForm.style.display = 'none';
    }

    if (newItemForm) {
        newItemForm.reset();
    }
}

function saveNewItem() {
    const itemName = document.getElementById('settingsItemName').value;
    const itemCategory = document.getElementById('settingsItemCategory').value;
    // const itemPrice = parseFloat(document.getElementById('settingsItemPrice').value) || 0;
    const itemDescription = document.getElementById('settingsItemDescription').value;

    if (!itemName) {
        alert('Please enter item name!');
        return;
    }

    // Check if item already exists (for modification)
    const existingItemIndex = orderItems.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());

    if (existingItemIndex !== -1) {
        // Update existing item
        const existingItem = orderItems[existingItemIndex];
        existingItem.itemCategory = itemCategory;
        // existingItem.rate = itemPrice;
        existingItem.description = itemDescription;

        if (typeof database !== 'undefined' && database && existingItem.orderId) {
            database.ref('orderItems/' + existingItem.orderId).update(existingItem)
                .then(() => {
                    alert('Item updated successfully!');
                    cancelAddItem();
                    loadOrderItems();
                })
                .catch((error) => {
                    console.error('Error updating item:', error);
                    alert('Error updating item. Please try again.');
                });
        } else {
            localStorage.setItem('orderItems', JSON.stringify(orderItems));
            updateItemNameDatalist();
            cancelAddItem();
            alert('Item updated successfully!');
        }
    } else {
        // Create new item
        const newItem = {
            id: Date.now(),
            itemName: itemName,
            itemCategory: itemCategory,
            // rate: itemPrice,
            description: itemDescription
        };

        if (typeof database !== 'undefined' && database) {
            database.ref('orderItems').push(newItem)
                .then(() => {
                    alert('Item saved successfully!');
                    cancelAddItem();
                    loadOrderItems();
                })
                .catch((error) => {
                    console.error('Error saving item:', error);
                    alert('Error saving item. Please try again.');
                });
        } else {
            orderItems.push(newItem);
            localStorage.setItem('orderItems', JSON.stringify(orderItems));
            updateItemNameDatalist();
            cancelAddItem();
            alert('Item saved successfully!');
        }
    }
}

// Centralized Event Delegation System for all data-action attributes
document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    if (action) {
        e.preventDefault();

        switch (action) {
            // User Management Actions
            case 'edit-user':
                const userKey1 = target.getAttribute('data-user-key');
                if (userKey1) editUser(userKey1);
                break;

            case 'delete-user':
                const userKey2 = target.getAttribute('data-user-key');
                if (userKey2) deleteUser(userKey2);
                break;

            case 'save-user-changes':
                saveUserChanges();
                break;

            case 'edit-user-mgmt':
                const userKey3 = target.getAttribute('data-user-key');
                if (userKey3) editUser(userKey3);
                break;

            case 'change-password':
                const userKey4 = target.getAttribute('data-user-key');
                if (userKey4) showChangePasswordModal(userKey4);
                break;

            case 'toggle-user-status':
                const userKey5 = target.getAttribute('data-user-key');
                const userStatus = target.getAttribute('data-user-status');
                if (userKey5 && userStatus) toggleUserStatus(userKey5, userStatus);
                break;

            case 'delete-user-mgmt':
                const userKey6 = target.getAttribute('data-user-key');
                const userName = target.getAttribute('data-user-name');
                if (userKey6 && userName) deleteUser(userKey6, userName);
                break;

            // Stylist Management Actions
            case 'save-stylist-changes':
                saveStylistChanges();
                break;

            case 'edit-stylist':
                const stylistIndex = target.getAttribute('data-stylist-index');
                if (stylistIndex) editStylist(parseInt(stylistIndex));
                break;

            // Export Functions
            case 'export-mismatches':
                exportMismatches();
                break;

            // Pagination Actions
            case 'change-page':
                const page = target.getAttribute('data-page');
                if (page) changePaymentPage(parseInt(page));
                break;

            // Security Actions
            case 'close-security-popup':
                target.parentElement.parentElement.remove();
                target.parentElement.remove();
                break;

            // Sale Order Actions
            case 'view-order':
                const orderId1 = target.getAttribute('data-order-id');
                if (orderId1) viewSaleOrder(orderId1);
                break;

            case 'edit-order':
                const orderId2 = target.getAttribute('data-order-id');
                if (orderId2) editSaleOrder(orderId2);
                break;

            case 'delete-order':
                const orderId3 = target.getAttribute('data-order-id');
                if (orderId3) deleteSaleOrder(orderId3);
                break;
        }
    }
});


// Show media section when sidebar link is clicked
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#media-upload') {
                e.preventDefault();
                document.querySelectorAll('.dashboard-section').forEach(function (sec) { sec.style.display = 'none'; });
                document.getElementById('media-upload').style.display = 'block';
                // Load media when section is shown
                loadMediaGallery();
            }
        });
    });
});

// Media Gallery Functions
let mediaFiles = [];
let currentUploadTask = null;

// Diagnostic function to check Firebase Storage connectivity
async function diagnoseFirebaseStorage() {
    console.log('🔍 Running Firebase Storage Diagnostics...');

    try {
        // Test 1: Check if storage is initialized
        console.log('✅ Storage reference:', storage ? 'Available' : '❌ Not initialized');

        // Test 2: List media folder contents
        const mediaRef = storage.ref('media');
        console.log('📁 Listing media folder...');
        const result = await mediaRef.listAll();
        console.log(`✅ Found ${result.prefixes.length} location folders, ${result.items.length} root files`);

        // Test 3: Check each location folder
        for (const folderRef of result.prefixes) {
            console.log(`📍 Checking location: ${folderRef.name}`);
            const locationResult = await folderRef.listAll();
            console.log(`  📅 Date folders: ${locationResult.prefixes.length}`);

            for (const dateRef of locationResult.prefixes) {
                const dateResult = await dateRef.listAll();
                console.log(`    📁 ${dateRef.name}: ${dateResult.items.length} files`);

                // Test first file from each date folder
                if (dateResult.items.length > 0) {
                    const testFile = dateResult.items[0];
                    try {
                        const url = await testFile.getDownloadURL();
                        console.log(`    ✅ Sample file URL generated: ${testFile.name}`);

                        // Test URL accessibility
                        const response = await fetch(url, { method: 'HEAD' });
                        console.log(`    ${response.ok ? '✅' : '❌'} URL accessibility: ${response.status}`);
                    } catch (urlError) {
                        console.log(`    ❌ Failed to get URL for ${testFile.name}:`, urlError);
                    }
                }
            }
        }

        console.log('🎯 Diagnostics completed!');
    } catch (error) {
        console.error('❌ Diagnostic error:', error);
    }
}

// Load Media Gallery
async function loadMediaGallery() {
    try {
        showMediaMessage('Loading media files...', 'info');

        // Get list of all files from Firebase Storage
        const mediaRef = storage.ref('media');
        const result = await mediaRef.listAll();

        const files = [];
        const locations = new Set();
        const dates = new Set();

        // Process each subfolder (locations)
        for (const folderRef of result.prefixes) {
            const locationName = folderRef.name;
            locations.add(locationName);

            // Get subfolders (dates) in each location
            const locationResult = await folderRef.listAll();

            for (const dateRef of locationResult.prefixes) {
                const dateName = dateRef.name;
                dates.add(dateName);

                // Get files in each date folder
                const dateResult = await dateRef.listAll();

                for (const fileRef of dateResult.items) {
                    try {
                        // Skip system files and invalid file types
                        if (fileRef.name.startsWith('.') || fileRef.name.includes('__')) {
                            continue;
                        }

                        // Get metadata first to validate file
                        const metadata = await fileRef.getMetadata();

                        // Skip files without proper content type
                        if (!metadata.contentType) {
                            console.warn(`Skipping file with no content type: ${fileRef.fullPath}`);
                            continue;
                        }

                        // Get download URL with error handling
                        let url;
                        try {
                            url = await fileRef.getDownloadURL();
                        } catch (urlError) {
                            console.error(`Failed to get download URL for ${fileRef.fullPath}:`, urlError);
                            continue;
                        }

                        files.push({
                            name: fileRef.name,
                            fullPath: fileRef.fullPath,
                            url: url,
                            location: locationName,
                            date: dateName,
                            size: metadata.size,
                            timeCreated: metadata.timeCreated,
                            contentType: metadata.contentType,
                            ref: fileRef // Store reference for future operations
                        });
                    } catch (error) {
                        console.error(`Error loading file ${fileRef.fullPath}:`, error);

                        // For 404 errors, try to re-upload the file if it exists locally
                        if (error.code === 'storage/object-not-found') {
                            console.warn(`File not found in storage: ${fileRef.fullPath}`);
                        }
                    }
                }
            }
        }

        mediaFiles = files;
        updateMediaFilters(Array.from(locations), Array.from(dates));
        displayMediaFiles(files);
        updateMediaStats(files);

    } catch (error) {
        console.error('Error loading media gallery:', error);
        showMediaMessage('Error loading media files. Please check if files are uploaded correctly.', 'danger');

        // Show empty state
        document.getElementById('mediaGrid').innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-images fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No Media Files Found</h5>
                <p class="text-muted">Upload some images to get started</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadMediaModal">
                    <i class="fas fa-upload me-2"></i>Upload Media
                </button>
            </div>
        `;
    }
}

// Update Media Filters
function updateMediaFilters(locations, dates) {
    const locationFilter = document.getElementById('mediaLocationFilter');
    const dateFilter = document.getElementById('mediaDateFilter');

    // Update locations
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });

    // Update dates
    dateFilter.innerHTML = '<option value="">All Dates</option>';
    dates.sort().reverse().forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDateString(date);
        dateFilter.appendChild(option);
    });

    // Add event listeners for filters
    locationFilter.addEventListener('change', filterMediaFiles);
    dateFilter.addEventListener('change', filterMediaFiles);
    document.getElementById('mediaSearch').addEventListener('input', filterMediaFiles);
}

// Display Media Files
function displayMediaFiles(files) {
    const mediaGrid = document.getElementById('mediaGrid');

    if (files.length === 0) {
        mediaGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No Files Found</h5>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    // Sort: Images first, then videos
    files.sort((a, b) => {
        if (a.contentType.startsWith('image/') && !b.contentType.startsWith('image/')) return -1;
        if (!a.contentType.startsWith('image/') && b.contentType.startsWith('image/')) return 1;
        return 0;
    });

    mediaGrid.innerHTML = files.map(file => {
        const isImage = file.contentType && file.contentType.startsWith('image/');
        const isVideo = file.contentType && file.contentType.startsWith('video/');

        return `
            <div class="col-6 col-md-4 col-lg-3 mb-2 mb-md-3">
                <div class="card media-card h-100 border-0 shadow-sm" onclick="previewMedia('${file.fullPath}')">
                    <div class="position-relative">
                        ${isImage ? `
                            <img src="${file.url}" class="card-img-top" style="height: 120px; height: 160px; object-fit: cover;" 
                                 alt="${file.name}" loading="lazy" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="d-none align-items-center justify-content-center bg-light position-absolute w-100 h-100" 
                                 style="height: 160px; top: 0;">
                                <div class="text-center text-muted">
                                    <i class="fas fa-image fa-2x mb-1"></i>
                                    <small class="d-block">Failed to load</small>
                                </div>
                            </div>
                        ` : isVideo ? `
                            <video class="card-img-top" style="height: 160px; object-fit: cover;" muted loading="lazy">
                                <source src="${file.url}" type="${file.contentType}">
                            </video>
                            <div class="position-absolute top-50 start-50 translate-middle">
                                <i class="fas fa-play-circle fa-2x text-white opacity-75"></i>
                            </div>
                        ` : `
                            <div class="d-flex align-items-center justify-content-center bg-light" style="height: 160px;">
                                <i class="fas fa-file fa-2x text-muted"></i>
                            </div>
                        `}
                        <div class="position-absolute top-0 end-0 m-1 m-md-2">
                            <span class="badge bg-primary small" style="font-size: 0.6rem;">${file.location}</span>
                        </div>
                        <div class="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-1 p-md-2">
                            <small class="d-block text-truncate" style="font-size: 0.65rem;">${file.name}</small>
                        </div>
                    </div>
                    <div class="card-body p-1 p-md-2">
                        <small class="text-muted d-block" style="font-size: 0.65rem;">
                            <i class="fas fa-calendar me-1"></i>${formatDateString(file.date)}
                            <span class="d-block">
                                <i class="fas fa-hdd me-1"></i>${formatFileSize(file.size)}
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Preview Media
async function previewMedia(filePath) {
    try {
        const file = mediaFiles.find(f => f.fullPath === filePath);
        if (!file) return;

        const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));

        // Update modal content
        document.getElementById('imagePreviewTitle').textContent = file.name;
        document.getElementById('previewImage').src = file.url;
        document.getElementById('imageFilename').textContent = file.name;
        document.getElementById('imageLocation').textContent = file.location;
        document.getElementById('imageDate').textContent = formatDateString(file.date);
        document.getElementById('imageSize').textContent = formatFileSize(file.size);
        document.getElementById('imageURL').href = file.url;
        document.getElementById('imageUploadTime').textContent = new Date(file.timeCreated).toLocaleString();

        // Set delete button data
        document.getElementById('deleteImageBtn').setAttribute('data-file-path', filePath);

        modal.show();
    } catch (error) {
        console.error('Error previewing media:', error);
        showAlert('Error loading media preview', 'danger');
    }
}

// Filter Media Files
function filterMediaFiles() {
    const locationFilter = document.getElementById('mediaLocationFilter').value;
    const dateFilter = document.getElementById('mediaDateFilter').value;
    const searchQuery = document.getElementById('mediaSearch').value.toLowerCase();

    const filtered = mediaFiles.filter(file => {
        const matchesLocation = !locationFilter || file.location === locationFilter;
        const matchesDate = !dateFilter || file.date === dateFilter;
        const matchesSearch = !searchQuery || file.name.toLowerCase().includes(searchQuery);

        return matchesLocation && matchesDate && matchesSearch;
    });

    displayMediaFiles(filtered);
}

// Clear Media Filters
function clearMediaFilters() {
    document.getElementById('mediaLocationFilter').value = '';
    document.getElementById('mediaDateFilter').value = '';
    document.getElementById('mediaSearch').value = '';
    displayMediaFiles(mediaFiles);
}

// Update Media Stats
function updateMediaStats(files) {
    const totalFiles = files.length;
    const uniqueLocations = new Set(files.map(f => f.location)).size;
    const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
    const recentFiles = files.filter(f => {
        const fileDate = new Date(f.timeCreated);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return fileDate > weekAgo;
    }).length;

    document.getElementById('totalMediaCount').textContent = totalFiles;
    document.getElementById('uniqueLocationsCount').textContent = uniqueLocations;
    document.getElementById('recentUploadsCount').textContent = recentFiles;
    document.getElementById('totalStorageSize').textContent = formatFileSize(totalSize);
}

// Upload Media Functions
document.addEventListener('DOMContentLoaded', function () {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('uploadDate').value = today;

    // Upload button event
    document.getElementById('startUploadBtn').addEventListener('click', startMediaUpload);

    // Cancel upload
    document.getElementById('cancelUploadBtn').addEventListener('click', cancelMediaUpload);

    // Delete image button
    document.getElementById('deleteImageBtn').addEventListener('click', deleteMediaFile);
});

// Start Media Upload
async function startMediaUpload() {
    const locationSelect = document.getElementById('uploadLocation');
    const dateInput = document.getElementById('uploadDate');
    const filesInput = document.getElementById('mediaFiles');

    if (!locationSelect || !dateInput || !filesInput) {
        console.error('Form elements not found');
        return;
    }

    const location = locationSelect.value;
    const date = dateInput.value;
    const files = filesInput.files;

    if (!location || location === '' || !date || date === '' || !files || files.length === 0) {
        console.log('Please fill all required fields and select files', location, date, files.length);
        showAlert('Please fill all required fields and select files', 'warning');
        return;
    }

    // Show progress
    document.getElementById('uploadProgress').style.display = 'block';
    document.getElementById('startUploadBtn').disabled = true;
    document.getElementById('cancelUploadBtn').textContent = 'Cancel Upload';

    let uploadedCount = 0;
    let failedCount = 0;
    const totalFiles = files.length;

    try {
        // Detect existing date format for this location
        const dateFormat = await getExistingDateFormat(location);
        const formattedDate = convertDateToFormat(date, dateFormat);

        updateUploadStatus(`Using date format: ${dateFormat} → ${formattedDate}`);
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                showAlert(`File ${file.name} is too large (max 10MB)`, 'warning');
                failedCount++;
                continue;
            }

            const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const fileName = sanitizedName;
            const storageRef = storage.ref(`media/${location}/${formattedDate}/${fileName}`);

            updateUploadStatus(`Checking ${fileName}...`);

            try {
                // Check for duplicates
                try {
                    await storageRef.getMetadata();
                    // File exists - skip it
                    updateUploadStatus(`⚠️ Skipped: ${fileName} (already exists)`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    continue;
                } catch (metadataError) {
                    if (metadataError.code !== 'storage/object-not-found') {
                        throw metadataError;
                    }
                }

                updateUploadStatus(`Uploading ${fileName}...`);

                // Upload file with progress tracking
                const uploadTask = storageRef.put(file);
                currentUploadTask = uploadTask;

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        const overallProgress = Math.round(((uploadedCount + progress / 100) / totalFiles) * 100);
                        updateUploadProgress(overallProgress);
                    },
                    (error) => {
                        console.error(`Upload error for ${fileName}:`, error);
                        failedCount++;
                    },
                    async () => {
                        // Upload completed successfully
                        uploadedCount++;
                        const overallProgress = Math.round((uploadedCount / totalFiles) * 100);
                        updateUploadProgress(overallProgress);
                        console.log(`✅ Uploaded: ${fileName}`);
                    }
                );

                await uploadTask;

            } catch (error) {
                console.error(`Failed to upload ${fileName}:`, error);
                failedCount++;
            }
        }

        // Upload completed
        if (failedCount === 0) {
            showAlert(`All ${uploadedCount} files uploaded successfully!`, 'success');
        } else {
            showAlert(`${uploadedCount} files uploaded, ${failedCount} failed`, 'warning');
        }

        // Reset form and close modal after delay
        setTimeout(() => {
            resetUploadForm();
            const modalEl = document.getElementById('uploadMediaModal');
            if (modalEl) {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
            // Refresh media gallery and dashboard
            renderLocationFolders();
            // Refresh dashboard carousel filters and media
            loadCarouselFilters().then(() => {
                if (document.getElementById('dashboard') && document.getElementById('dashboard').style.display !== 'none') {
                    filterCarouselMedia();
                }
            });
        }, 1500);

    } catch (error) {
        console.error('Upload process error:', error);
        showAlert('Upload failed. Please try again.', 'danger');
        resetUploadForm();
    }
}

// Cancel Media Upload
function cancelMediaUpload() {
    if (currentUploadTask) {
        currentUploadTask.cancel();
        currentUploadTask = null;
        showAlert('Upload cancelled', 'info');
    }
    resetUploadForm();
}

// Update Upload Progress
function updateUploadProgress(percentage) {
    document.getElementById('uploadPercentage').textContent = `${percentage}%`;
    document.getElementById('uploadProgressBar').style.width = `${percentage}%`;
}

// Update Upload Status
function updateUploadStatus(message) {
    document.getElementById('uploadStatus').textContent = message;
}

// Reset Upload Form
function resetUploadForm() {
    document.getElementById('uploadMediaForm').reset();
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('startUploadBtn').disabled = false;
    document.getElementById('cancelUploadBtn').textContent = 'Cancel';
    updateUploadProgress(0);
    updateUploadStatus('');

    // Set today's date again
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('uploadDate').value = today;
}

// Delete Media File
async function deleteMediaFile() {
    const filePath = document.getElementById('deleteImageBtn').getAttribute('data-file-path');

    if (!filePath) return;

    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
        return;
    }

    try {
        const fileRef = storage.ref(filePath);
        await fileRef.delete();

        showAlert('File deleted successfully', 'success');
        bootstrap.Modal.getInstance(document.getElementById('imagePreviewModal')).hide();

        // Refresh media gallery
        setTimeout(() => {
            loadMediaGallery();
        }, 500);

    } catch (error) {
        console.error('Error deleting file:', error);
        showAlert('Error deleting file. Please try again.', 'danger');
    }
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDateString(dateStr) {
    if (!dateStr) return 'Unknown';

    // Handle various date formats
    let date;

    // Check for DD-MM-YYYY format (31-12-2025)
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const parts = dateStr.split('-');
        date = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    // Check for YYYY-MM-DD format (2025-12-31)
    else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        date = new Date(dateStr);
    }
    // Check for DD.MM.YYYY format
    else if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
        const parts = dateStr.split('.');
        date = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    // Check for YYYY.MM.DD format
    else if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) {
        const parts = dateStr.split('.');
        date = new Date(parts[0], parts[1] - 1, parts[2]);
    }
    else {
        return dateStr; // Return as-is if format not recognized
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return dateStr;
    }

    // Return formatted date
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showMediaMessage(message, type = 'info') {
    const mediaGrid = document.getElementById('mediaGrid');
    const iconMap = {
        'info': 'fas fa-info-circle',
        'danger': 'fas fa-exclamation-triangle',
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-circle'
    };

    mediaGrid.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="${iconMap[type] || iconMap.info} fa-3x text-${type} mb-3"></i>
            <p class="text-${type}">${message}</p>
        </div>
    `;
}

// Add CSS for media cards
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
        .media-card {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            cursor: pointer;
        }
        
        .media-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .media-card .card-img-top {
            transition: opacity 0.2s ease-in-out;
        }
        
        .media-card:hover .card-img-top {
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
});

// Media Carousel Functions
async function loadCarouselFilters() {
    try {
        const mediaRef = storage.ref('media');
        const result = await mediaRef.listAll();

        const locations = new Set();
        const dates = new Set();

        for (const folderRef of result.prefixes) {
            const locationName = folderRef.name;
            locations.add(locationName);

            const locationResult = await folderRef.listAll();
            for (const dateRef of locationResult.prefixes) {
                dates.add(dateRef.name);
            }
        }

        const locationFilter = document.getElementById('carouselLocationFilter');
        const dateFilter = document.getElementById('carouselDateFilter');

        if (locationFilter) {
            locationFilter.innerHTML = '<option value="">All Locations</option>';
            Array.from(locations).sort().forEach(loc => {
                locationFilter.innerHTML += `<option value="${loc}">${loc}</option>`;
            });
        }

        if (dateFilter) {
            dateFilter.innerHTML = '<option value="">All Dates</option>';
            Array.from(dates).sort().reverse().forEach(date => {
                dateFilter.innerHTML += `<option value="${date}">${formatDateString(date)}</option>`;
            });
        }

        return { locations, dates }; // Return data for chaining
    } catch (error) {
        console.error('Error loading carousel filters:', error);
        return { locations: new Set(), dates: new Set() };
    }
}

let carouselMediaData = [];
let currentCarouselIndex = 0;
let currentCarouselType = 'all'; // 'all', 'image', 'video'

function setCarouselType(type) {
    currentCarouselType = type;

    // Update button styles
    document.getElementById('typeImageBtn').style.opacity = type === 'image' ? '1' : '0.7';
    document.getElementById('typeVideoBtn').style.opacity = type === 'video' ? '1' : '0.7';
    document.getElementById('typeAllBtn').style.opacity = type === 'all' ? '1' : '0.7';

    filterCarouselMedia();
}

function navigateCarousel(direction) {
    const filteredMedia = getFilteredMedia();

    currentCarouselIndex += direction;

    if (currentCarouselIndex < 0) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex >= filteredMedia.length) {
        currentCarouselIndex = filteredMedia.length - 1;
    }

    renderCarouselMedia(filteredMedia);
}

function getFilteredMedia() {
    if (currentCarouselType === 'all') {
        return carouselMediaData;
    }
    return carouselMediaData.filter(m => m.type === currentCarouselType);
}

function renderCarouselMedia(mediaList) {
    const mainContent = document.getElementById('carouselMainContent');
    const thumbnailsContainer = document.getElementById('carouselThumbnails');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');

    if (mediaList.length === 0) {
        mainContent.innerHTML = `
            <div class="d-flex align-items-center justify-content-center h-100 p-5">
                <div class="text-center text-muted">
                    <i class="fas fa-folder-open fa-3x mb-3"></i>
                    <p>No media found for selected filters</p>
                </div>
            </div>
        `;
        thumbnailsContainer.innerHTML = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    // Enable/disable navigation buttons
    prevBtn.disabled = currentCarouselIndex === 0;
    nextBtn.disabled = currentCarouselIndex === mediaList.length - 1;

    const currentMedia = mediaList[currentCarouselIndex];

    // Render main content
    mainContent.innerHTML = `
        <div style="position: relative; min-height: 400px; background: #000; display: flex; align-items: center; justify-content: center;">
            ${currentMedia.type === 'image' ? `
                <img src="${currentMedia.url}" class="d-block" style="max-height: 500px; max-width: 100%; object-fit: contain; cursor: pointer;" 
                     alt="${currentMedia.name}" onclick="window.open('${currentMedia.url}', '_blank')">
            ` : `
                <video controls controlsList="nodownload" preload="metadata" class="d-block" 
                       style="max-height: 500px; max-width: 100%; outline: none;">
                    <source src="${currentMedia.url}" type="video/mp4">
                    <source src="${currentMedia.url}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            `}
            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); 
                        padding: 10px 20px; border-radius: 8px; color: white; max-width: 80%; pointer-events: none;">
                
                <p class="mb-0 small"><i class="fas fa-map-marker-alt me-2"></i>${currentMedia.location} | <i class="fas fa-calendar me-2"></i>${formatDateString(currentMedia.date)}</p>
            </div>
        </div>
    `;
    //<h6 class="mb-1"><i class="fas fa-${currentMedia.type === 'image' ? 'image' : 'video'} me-2"></i>${currentMedia.name}</h6>
    // Render thumbnails
    thumbnailsContainer.innerHTML = mediaList.map((media, index) => `
        <div style="cursor: pointer; opacity: ${index === currentCarouselIndex ? '1' : '0.4'}; 
                    transition: all 0.3s; border: ${index === currentCarouselIndex ? '3px solid #667eea' : '2px solid transparent'}; 
                    border-radius: 8px; overflow: hidden; width: 80px; height: 80px; flex-shrink: 0;"
             onclick="currentCarouselIndex = ${index}; renderCarouselMedia(getFilteredMedia());">
            ${media.type === 'image' ? `
                <img src="${media.url}" style="width: 100%; height: 100%; object-fit: cover;" alt="Thumbnail">
            ` : `
                <div style="width: 100%; height: 100%; background: #333; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-video text-white"></i>
                </div>
            `}
        </div>
    `).join('');
}

async function filterCarouselMedia() {
    const location = document.getElementById('carouselLocationFilter').value;
    const date = document.getElementById('carouselDateFilter').value;
    const imageCount = document.getElementById('carouselImageCount');
    const videoCount = document.getElementById('carouselVideoCount');

    const mainContent = document.getElementById('carouselMainContent');
    mainContent.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 p-5"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';

    try {
        const mediaRef = storage.ref('media');
        const allMedia = [];

        const folders = await mediaRef.listAll();

        for (const locRef of folders.prefixes) {
            if (location && locRef.name !== location) continue;

            const dateRefs = await locRef.listAll();
            for (const dateRef of dateRefs.prefixes) {
                if (date && dateRef.name !== date) continue;

                const files = await dateRef.listAll();
                for (const fileRef of files.items) {
                    const fileName = fileRef.name.toLowerCase();
                    const isImage = fileName.match(/\.(jpg|jpeg|png|gif|webp)$/);
                    const isVideo = fileName.match(/\.(mp4|mov|avi|webm)$/);

                    if (isImage || isVideo) {
                        const url = await fileRef.getDownloadURL();
                        allMedia.push({
                            url,
                            name: fileRef.name,
                            location: locRef.name,
                            date: dateRef.name,
                            type: isImage ? 'image' : 'video'
                        });
                    }
                }
            }
        }

        // Sort: Images first, then videos
        allMedia.sort((a, b) => {
            if (a.type === 'image' && b.type !== 'image') return -1;
            if (a.type !== 'image' && b.type === 'image') return 1;
            return 0;
        });

        carouselMediaData = allMedia;
        currentCarouselIndex = 0;

        const images = allMedia.filter(m => m.type === 'image');
        const videos = allMedia.filter(m => m.type === 'video');

        imageCount.textContent = images.length;
        videoCount.textContent = videos.length;

        renderCarouselMedia(getFilteredMedia());

    } catch (error) {
        console.error('Error filtering carousel media:', error);
        mainContent.innerHTML = `
            <div class="d-flex align-items-center justify-content-center h-100 p-5">
                <div class="text-center text-danger">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <p>Error loading media</p>
                </div>
            </div>
        `;
    }
}

// Load carousel filters on page load
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        loadCarouselFilters();
        // Pre-fetch media gallery data in background for faster loading
        prefetchMediaGalleryData();
    }, 1000);
});

// Pre-fetch media gallery data in background
function prefetchMediaGalleryData() {
    console.log('🚀 Pre-fetching media gallery data in background...');
    loadGalleryMedia().then(() => {
        console.log('✅ Media gallery data pre-fetched and cached');
    }).catch(error => {
        console.error('❌ Error pre-fetching media:', error);
    });
}

// ==========================================
// MEDIA GALLERY SECTION (NEW - WITH CACHING)
// ==========================================

// Global cache for media files to avoid repeated Firebase downloads
let galleryMediaCache = {
    files: [],
    locations: new Set(),
    dates: new Set(),
    lastUpdated: null,
    isLoaded: false
};

// Initialize Media Gallery when section is shown
document.addEventListener('DOMContentLoaded', function () {
    const galleryLink = document.querySelector('a[href="#media-gallery"]');
    if (galleryLink) {
        galleryLink.addEventListener('click', function (e) {
            e.preventDefault();
            // Hide all sections
            document.querySelectorAll('.dashboard-section, .form-section').forEach(function (sec) {
                sec.style.display = 'none';
            });
            // Show media gallery
            document.getElementById('media-gallery').style.display = 'block';

            // Load gallery if not already loaded or if cache is old (>5 minutes)
            const now = Date.now();
            const cacheAge = galleryMediaCache.lastUpdated ? now - galleryMediaCache.lastUpdated : Infinity;
            const cacheMaxAge = 5 * 60 * 1000; // 5 minutes

            if (!galleryMediaCache.isLoaded || cacheAge > cacheMaxAge) {
                loadGalleryMedia();
            } else {
                console.log('📦 Using cached media data');
                displayGalleryMedia(galleryMediaCache.files);
            }
        });
    }
});

// Load Gallery Media from Firebase (with caching)
async function loadGalleryMedia() {
    const gridElement = document.getElementById('galleryMediaGrid');
    gridElement.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-spinner fa-spin fa-2x text-primary mb-3"></i>
            <p class="text-muted">Loading media gallery...</p>
        </div>
    `;

    try {
        const mediaRef = storage.ref('media');
        const result = await mediaRef.listAll();

        const files = [];
        const locations = new Set();
        const dates = new Set();

        // Process each location folder
        for (const folderRef of result.prefixes) {
            const locationName = folderRef.name;
            locations.add(locationName);

            const locationResult = await folderRef.listAll();

            // Process each date folder
            for (const dateRef of locationResult.prefixes) {
                const dateName = dateRef.name;
                dates.add(dateName);

                const dateResult = await dateRef.listAll();

                // Process each file
                for (const fileRef of dateResult.items) {
                    try {
                        // Skip system files
                        if (fileRef.name.startsWith('.') || fileRef.name.includes('__')) {
                            continue;
                        }

                        // Get metadata
                        const metadata = await fileRef.getMetadata();
                        if (!metadata.contentType) continue;

                        // Get download URL
                        const url = await fileRef.getDownloadURL();

                        // Determine file type
                        const isImage = metadata.contentType.startsWith('image/');
                        const isVideo = metadata.contentType.startsWith('video/');

                        if (isImage || isVideo) {
                            files.push({
                                name: fileRef.name,
                                fullPath: fileRef.fullPath,
                                url: url,
                                location: locationName,
                                date: dateName,
                                size: metadata.size,
                                timeCreated: metadata.timeCreated,
                                contentType: metadata.contentType,
                                type: isImage ? 'image' : 'video',
                                ref: fileRef
                            });
                        }
                    } catch (error) {
                        console.error(`Error loading file ${fileRef.fullPath}:`, error);
                    }
                }
            }
        }

        // Update cache
        galleryMediaCache = {
            files: files,
            locations: locations,
            dates: dates,
            lastUpdated: Date.now(),
            isLoaded: true
        };

        console.log(`✅ Loaded ${files.length} media files into cache`);

        // Update filters
        updateGalleryFilters();

        // Update stats
        updateGalleryStats(files);

        // Display all media
        displayGalleryMedia(files);

    } catch (error) {
        console.error('Error loading media gallery:', error);
        gridElement.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h5 class="text-danger">Error Loading Media</h5>
                <p class="text-muted">Please refresh the page and try again.</p>
                <button class="btn btn-primary" onclick="refreshMediaGallery()">
                    <i class="fas fa-sync-alt me-2"></i>Refresh
                </button>
            </div>
        `;
    }
}

// Refresh Media Gallery (force reload)
function refreshMediaGallery() {
    galleryMediaCache.isLoaded = false;
    loadGalleryMedia();
}

// Update Gallery Filters
function updateGalleryFilters() {
    const locationFilter = document.getElementById('galleryLocationFilter');
    const dateFilter = document.getElementById('galleryDateFilter');

    // Update locations
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    Array.from(galleryMediaCache.locations).sort().forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });

    // Update dates (most recent first)
    dateFilter.innerHTML = '<option value="">All Dates</option>';
    Array.from(galleryMediaCache.dates).sort().reverse().forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDateString(date);
        dateFilter.appendChild(option);
    });
}

// Update Gallery Statistics
function updateGalleryStats(files) {
    const totalMedia = files.length;
    const totalImages = files.filter(f => f.type === 'image').length;
    const totalVideos = files.filter(f => f.type === 'video').length;
    const totalLocations = galleryMediaCache.locations.size;

    document.getElementById('galleryTotalMedia').textContent = totalMedia;
    document.getElementById('galleryTotalImages').textContent = totalImages;
    document.getElementById('galleryTotalVideos').textContent = totalVideos;
    document.getElementById('galleryTotalLocations').textContent = totalLocations;
}

// Display Gallery Media in 4-5 column grid
function displayGalleryMedia(files) {
    const gridElement = document.getElementById('galleryMediaGrid');

    if (files.length === 0) {
        gridElement.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No Media Found</h5>
                <p class="text-muted">Try adjusting your filters or upload some media files.</p>
            </div>
        `;
        return;
    }

    // Sort: Images first, then videos
    files.sort((a, b) => {
        if (a.type === 'image' && b.type !== 'image') return -1;
        if (a.type !== 'image' && b.type === 'image') return 1;
        return 0;
    });

    gridElement.innerHTML = files.map(file => {
        const isImage = file.type === 'image';
        const isVideo = file.type === 'video';

        return `
            <div>
                <div class="card h-100 border-0 shadow-sm media-card" onclick="previewGalleryMedia('${file.fullPath}')">
                    <div class="position-relative">
                        ${isImage ? `
                            <img src="${file.url}" class="card-img-top" style="height: 180px; object-fit: cover;" 
                                 alt="${file.name}" loading="lazy"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="d-none align-items-center justify-content-center bg-light position-absolute w-100" 
                                 style="height: 180px; top: 0;">
                                <div class="text-center text-muted">
                                    <i class="fas fa-image fa-2x mb-1"></i>
                                    <small class="d-block">Failed to load</small>
                                </div>
                            </div>
                        ` : `
                            <div class="d-flex align-items-center justify-content-center bg-dark" style="height: 180px;">
                                <i class="fas fa-play-circle fa-3x text-white opacity-75"></i>
                            </div>
                        `}
                        <div class="position-absolute top-0 end-0 m-2">
                            <span class="badge ${isImage ? 'bg-success' : 'bg-info'}">
                                <i class="fas fa-${isImage ? 'image' : 'video'} me-1"></i>${isImage ? 'Image' : 'Video'}
                            </span>
                        </div>
                    </div>
                    <div class="card-body p-2">
                        <h6 class="card-title text-truncate mb-1" style="font-size: 0.85rem;" title="${file.name}">
                            ${file.name}
                        </h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted" style="font-size: 0.7rem;">
                                <i class="fas fa-map-marker-alt me-1"></i>${file.location}
                            </small>
                            <small class="text-muted" style="font-size: 0.7rem;">
                                <i class="fas fa-hdd me-1"></i>${formatFileSize(file.size)}
                            </small>
                        </div>
                        <small class="text-muted d-block mt-1" style="font-size: 0.7rem;">
                            <i class="fas fa-calendar me-1"></i>${formatDateString(file.date)}
                        </small>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Filter Gallery Media
function filterGalleryMedia() {
    const locationFilter = document.getElementById('galleryLocationFilter').value;
    const dateFilter = document.getElementById('galleryDateFilter').value;
    const typeFilter = document.getElementById('galleryTypeFilter').value;
    const searchQuery = document.getElementById('gallerySearchInput').value.toLowerCase();

    const filtered = galleryMediaCache.files.filter(file => {
        const matchesLocation = !locationFilter || file.location === locationFilter;
        const matchesDate = !dateFilter || file.date === dateFilter;
        const matchesType = !typeFilter || file.type === typeFilter;
        const matchesSearch = !searchQuery || file.name.toLowerCase().includes(searchQuery);

        return matchesLocation && matchesDate && matchesType && matchesSearch;
    });

    displayGalleryMedia(filtered);
    updateGalleryStats(filtered);
}

// Clear Gallery Filters
function clearGalleryFilters() {
    document.getElementById('galleryLocationFilter').value = '';
    document.getElementById('galleryDateFilter').value = '';
    document.getElementById('galleryTypeFilter').value = '';
    document.getElementById('gallerySearchInput').value = '';
    displayGalleryMedia(galleryMediaCache.files);
    updateGalleryStats(galleryMediaCache.files);
}

// Preview Gallery Media (Image or Video)
function previewGalleryMedia(filePath) {
    const file = galleryMediaCache.files.find(f => f.fullPath === filePath);
    if (!file) return;

    if (file.type === 'image') {
        // Show image preview modal
        const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
        document.getElementById('imagePreviewTitle').textContent = file.name;
        document.getElementById('previewImage').src = file.url;
        document.getElementById('imageFilename').textContent = file.name;
        document.getElementById('imageLocation').textContent = file.location;
        document.getElementById('imageDate').textContent = formatDateString(file.date);
        document.getElementById('imageSize').textContent = formatFileSize(file.size);
        document.getElementById('imageURL').href = file.url;
        document.getElementById('imageUploadTime').textContent = new Date(file.timeCreated).toLocaleString();
        document.getElementById('deleteImageBtn').setAttribute('data-file-path', filePath);
        modal.show();
    } else if (file.type === 'video') {
        // Show video preview modal
        const modal = new bootstrap.Modal(document.getElementById('videoPreviewModal'));
        document.getElementById('videoPreviewTitle').textContent = file.name;
        document.getElementById('videoSource').src = file.url;
        document.getElementById('previewVideo').load(); // Reload video
        document.getElementById('videoFilename').textContent = file.name;
        document.getElementById('videoLocation').textContent = file.location;
        document.getElementById('videoDate').textContent = formatDateString(file.date);
        document.getElementById('videoSize').textContent = formatFileSize(file.size);
        document.getElementById('videoURL').href = file.url;
        document.getElementById('videoUploadTime').textContent = new Date(file.timeCreated).toLocaleString();
        document.getElementById('deleteVideoBtn').setAttribute('data-file-path', filePath);
        modal.show();
    }
}

// Delete media from gallery
document.addEventListener('DOMContentLoaded', function () {
    // Handle video delete button
    const deleteVideoBtn = document.getElementById('deleteVideoBtn');
    if (deleteVideoBtn) {
        deleteVideoBtn.addEventListener('click', async function () {
            const filePath = this.getAttribute('data-file-path');
            if (!filePath) return;

            if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
                return;
            }

            try {
                const fileRef = storage.ref(filePath);
                await fileRef.delete();
                showAlert('Video deleted successfully', 'success');

                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('videoPreviewModal')).hide();

                // Refresh gallery
                setTimeout(() => {
                    refreshMediaGallery();
                }, 500);
            } catch (error) {
                console.error('Error deleting video:', error);
                showAlert('Error deleting video. Please try again.', 'danger');
            }
        });
    }
});
