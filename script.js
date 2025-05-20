const servicesDropdown = document.getElementById('services');
const otherServicesLabel = document.getElementById('other_services_label');
const otherServicesTextarea = document.getElementById('other_services');
const companyFirmDetailsSection = document.getElementById('company_firm_details');
const directorPartnerDetailsSection = document.getElementById('director_partner_details_section');
const shareholderDetailsSection = document.getElementById('shareholder_details_section');
const gstDetailsSection = document.getElementById('gst_details_section');
const fssaiDetailsSection = document.getElementById('fssai_details_section');
const trademarkDetailsSection = document.getElementById('trademark_details_section');
const isoDetailsSection = document.getElementById('iso_details_section');
const individualDetailsContainer = document.getElementById('individual_details_container');
const numDirectorsPartnersInput = document.getElementById('num_directors_partners');
const shareholderDetailsContainer = document.getElementById('shareholder_details_container');
const numShareholdersInput = document.getElementById('num_shareholders');


const nameInput = document.getElementById('entity_name');
const regAddressInput = document.getElementById('registered_address');
const stateRegInput = document.getElementById('state_of_registration');
const districtRegInput = document.getElementById('district_of_registration');
const businessNatureInput = document.getElementById('business_nature');


function updateFormFields() {
    const selectedServices = Array.from(servicesDropdown.selectedOptions).map(option => option.value);

    // Show/Hide "Other Services" textarea
    if (selectedServices.includes('other')) {
        otherServicesLabel.classList.remove('hidden');
        otherServicesTextarea.classList.remove('hidden');
    } else {
        otherServicesLabel.classList.add('hidden');
        otherServicesTextarea.classList.add('hidden');
    }

    // Show/Hide Company/Firm Details section and make fields required if any service is selected
    if (selectedServices.length > 0) {
        companyFirmDetailsSection.classList.remove('hidden');
        nameInput.required = true;
        regAddressInput.required = true;
        stateRegInput.required = true;
        districtRegInput.required = true;
        businessNatureInput.required = true;
    } else {
        companyFirmDetailsSection.classList.add('hidden');
        nameInput.required = false;
        regAddressInput.required = false;
        stateRegInput.required = false;
        districtRegInput.required = false;
    }


    // Show/Hide Director/Partner Details section
    const requiresDirectors = selectedServices.some(service =>
        service.startsWith('incorporation') || service === 'partnership' || service === 'proprietorship'
    );
    directorPartnerDetailsSection.classList.toggle('hidden', !requiresDirectors);

     // Show/Hide Shareholder Details Section
    const requiresShareholders = selectedServices.some(service => service.startsWith('incorporation'));
    shareholderDetailsSection.classList.toggle('hidden', !requiresShareholders);


    // Show/Hide GST Details section
    gstDetailsSection.classList.toggle('hidden', !selectedServices.includes('gst_registration'));

    // Show/Hide FSSAI Details section
    fssaiDetailsSection.classList.toggle('hidden', !selectedServices.some(service => service.startsWith('fssai')));

    // Show/Hide Trademark Details section
    trademarkDetailsSection.classList.toggle('hidden', !selectedServices.includes('trademark'));

    // Show/Hide ISO Details section
    isoDetailsSection.classList.toggle('hidden', !selectedServices.includes('iso'));

    // Update individual details based on the number of directors/partners
    if (requiresDirectors) {
        const num = parseInt(numDirectorsPartnersInput.value) || 0;
        individualDetailsContainer.innerHTML = ''; // Clear previous details.  IMPORTANT
        for (let i = 1; i <= num; i++) {
            const directorDiv = document.createElement('div');
            directorDiv.classList.add('director-details');
            let htmlContent = `
                <h3>Director/Partner/Proprietor ${i}</h3>
                <label for="name_${i}">Full Name <span class="required-doc">*</span></label>
                <input type="text" id="name_${i}" name="name[]" required><br>
                <label for="pan_${i}">PAN <span class="required-doc">*</span></label>
                <input type="text" id="pan_${i}" name="pan[]" required><br>
                <label for="aadhaar_${i}">Aadhaar Number</label>
                <input type="text" id="aadhaar_${i}" name="aadhaar[]"><br>
                <label for="photo_${i}">Passport Size Photo <span class="required-doc">*</span></label>
                <input type="file" id="photo_${i}" name="photo[]" required accept="image/*"><br>
                <label for="address_proof_${i}">Address Proof <span class="required-doc">*</span> (e.g., Aadhaar, Voter ID)</label>
                <input type="file" id="address_proof_${i}" name="address_proof[]" required><br>
                <label for="specimen_signature_${i}">Specimen Signature <span class="required-doc">*</span></label>
                <input type="file" id="specimen_signature_${i}" name="specimen_signature[]" required><br>
                <label for="kyc_docs_director_${i}">KYC Documents (PAN, Aadhaar, etc.) <span class="required-doc">*</span></label>
                <input type="file" id="kyc_docs_director_${i}" name="kyc_docs_director[]" multiple required><br>
                <label for="other_docs_director_${i}">Other Documents (if any)</label>
                <input type="file" id="other_docs_director_${i}" name="other_docs_director[]" multiple><br>
                `;

            if (selectedServices.some(service => service.startsWith('incorporation'))) {
                htmlContent += `<label for="din_${i}">DIN (Director Identification Number) - if applicable</label>
                                <input type="text" id="din_${i}" name="din[]"><br>`;
            }
            if (selectedServices.includes('partnership')) {
                htmlContent += `<label for="designation_${i}">Designation (Partner)</label>
                                <input type="text" id="designation_${i}" name="designation[]"><br>`;
            }
            if (selectedServices.includes('proprietorship')) {
                htmlContent += `<label for="designation_${i}">Designation (Proprietor)</label>
                                <input type="text" id="designation_${i}" name="designation[]"><br>`;
            }
            htmlContent += `<label for="dob_${i}">Date of Birth <span class="required-doc">*</span></label>
                            <input type="text" id="dob_${i}" name="dob[]" placeholder="DD/MM/YYYY" required><br>`;
            directorDiv.innerHTML = htmlContent; // Use innerHTML to set the content
            individualDetailsContainer.appendChild(directorDiv);
        }
    } else {
        individualDetailsContainer.innerHTML = ''; // Clear if not needed
    }

    //update shareholder details
    if (requiresShareholders) {
        const num = parseInt(numShareholdersInput.value) || 0;
        shareholderDetailsContainer.innerHTML = '';
        for (let i = 1; i <= num; i++) {
            const shareholderDiv = document.createElement('div');
            shareholderDiv.classList.add('shareholder-details');
            let htmlContent = `
                <h3>Shareholder/Subscriber ${i}</h3>
                <label for="shareholder_name_${i}">Full Name <span class="required-doc">*</span></label>
                <input type="text" id="shareholder_name_${i}" name="shareholder_name[]" required><br>
                <label for="shareholder_address_${i}">Address <span class="required-doc">*</span></label>
                <textarea id="shareholder_address_${i}" name="shareholder_address[]" required></textarea><br>
                <label for="shareholder_pan_${i}">PAN <span class="required-doc">*</span></label>
                <input type="text" id="shareholder_pan_${i}" name="shareholder_pan[]" required><br>
                <label for="shareholder_aadhaar_${i}">Aadhaar Number</label>
                <input type="text" id="shareholder_aadhaar_${i}" name="shareholder_aadhaar[]"><br>
                <label for="shares_subscribed_${i}">Number of Shares Subscribed <span class="required-doc">*</span></label>
                <input type="number" id="shares_subscribed_${i}" name="shares_subscribed[]" required min="1"><br>
                <label for="shareholder_photo_${i}">Passport Size Photo <span class="required-doc">*</span></label>
                <input type="file" id="shareholder_photo_${i}" name="shareholder_photo[]" required  accept="image/*"><br>
                <label for="kyc_docs_shareholder_${i}">KYC Documents (PAN, Aadhaar, etc.) <span class="required-doc">*</span></label>
                <input type="file" id="kyc_docs_shareholder_${i}" name="kyc_docs_shareholder[]" multiple required><br>
                <label for="other_docs_shareholder_${i}">Other Documents (if any)</label>
                <input type="file" id="other_docs_shareholder_${i}" name="other_docs_shareholder[]" multiple><br>
                `;
            shareholderDiv.innerHTML = htmlContent;
            shareholderDetailsContainer.appendChild(shareholderDiv);
        }
    } else {
        shareholderDetailsContainer.innerHTML = '';
    }


    //Show or hide based on services selected.
    gstDetailsSection.classList.toggle('hidden', !selectedServices.includes('gst_registration'));
    fssaiDetailsSection.classList.toggle('hidden', !selectedServices.some(service => service.startsWith('fssai')));
    trademarkDetailsSection.classList.toggle('hidden', !selectedServices.includes('trademark'));
    isoDetailsSection.classList.toggle('hidden', !selectedServices.includes('iso'));

     if(requiresDirectors){
       directorPartnerDetailsSection.classList.remove('hidden');
     }else{
        directorPartnerDetailsSection.classList.add('hidden');
     }
     if(requiresShareholders){
        shareholderDetailsSection.classList.remove('hidden');
     }else{
        shareholderDetailsSection.classList.add('hidden');
     }
}

servicesDropdown.addEventListener('change', updateFormFields);
numDirectorsPartnersInput.addEventListener('change', updateFormFields); // Update on number change
numShareholdersInput.addEventListener('change', updateFormFields);

// Initial call to set initial state
updateFormFields();
