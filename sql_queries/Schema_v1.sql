create database pradan_test4;
use pradan_test4;
GRANT SELECT, INSERT, UPDATE, DELETE ON pradan_test4.* TO 'mobile_backend'@'%';
FLUSH PRIVILEGES;

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name char(255) NOT NULL,
    email char(255) NOT NULL UNIQUE,
    password char(255) NOT NULL,
    role char(255) NOT NULL,
    mobile varchar(255),
    date_of_joining varchar(255),
    location VARCHAR(255),
    created_at varchar(255),
    photo VARCHAR(255)
);
CREATE TABLE forms (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_type bigint NOT NULL,
    farmer_name char(255) NOT NULL,
    age varchar(10) not null,
    mobile varchar(255) NOT NULL,
    district char(255) not null,
    block CHAR(255) NOT NULL,
	panchayat CHAR(255) NOT NULL,
    hamlet CHAR(255) NOT NULL,
    id_type CHAR(255) NOT NULL,
    id_number CHAR(255) NOT NULL,
    gender CHAR(10) NOT NULL,
    spouse CHAR(255) NOT NULL,
    type_of_households VARCHAR(255) NOT NULL,
    h_members bigint NOT NULL,
    hh_occupation varchar(255) not null,
    special_catog VARCHAR(255),
    caste VARCHAR(255) NOT NULL,
    house_owner VARCHAR(255) NOT NULL,
    type_of_house VARCHAR(255) NOT NULL,  
    drinking_water VARCHAR(255) NOT NULL,
    potability VARCHAR(255) NOT NULL,
    domestic_water VARCHAR(255) NOT NULL,
    toilet_avail VARCHAR(255) NOT NULL,
    toilet_cond VARCHAR(255) NOT NULL,
    household_education VARCHAR(255) NOT NULL,
    user_id bigint UNSIGNED NOT NULL,
    created_at varchar(255) NOT NULL,
    lat varchar(255) NOT NULL,
    lon varchar(255) NOT NULL,
    mcode VARCHAR(255) NOT NULL,
    status bigint NOT NULL,
    remarks varchar(255) ,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE bank_details (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_id BIGINT UNSIGNED NOT NULL,
    account_holder_name CHAR(255) NOT NULL,
    account_number bigint NOT NULL,
    bank_name CHAR(255) NOT NULL,
    branch CHAR(255) NOT NULL,
    ifsc_code CHAR(20) NOT NULL,
    farmer_ack VARCHAR(255),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);
CREATE TABLE files (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_id BIGINT UNSIGNED NOT NULL,
    identity CHAR(255),
    geotag CHAR(255),
    patta VARCHAR(255),
    fmb VARCHAR(255),
    photo VARCHAR(255),
    passbook VARCHAR(255),
    passbook_postfunding VARCHAR(255),
    payment_voucher varchar(255),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);
CREATE TABLE form_lands (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_id BIGINT UNSIGNED NOT NULL,
    ownership VARCHAR(255),
    well_irrigation VARCHAR(255),
    area_irrigated VARCHAR(255),
    irrigated_lands VARCHAR(255),
    patta VARCHAR(255),
    total_area VARCHAR(255),
    taluk varchar(255),
    firka varchar(255),
    revenue VARCHAR(255),
    crop_season VARCHAR(255),
    livestocks VARCHAR(255),
    sf_number CHAR(255),
    soil_type CHAR(255),
    land_to_benefit char(255),
    date_of_ins varchar(255),
    area_benefited CHAR(255),
    type_of_work CHAR(255),
    any_other_works CHAR(255),
    p_contribution CHAR(255),
    f_contribution CHAR(255),
    total_est CHAR(255),
    field_insp VARCHAR(255),
    site_app VARCHAR(255),
    date_of_app varchar(255),
    area_benefited_postfunding VARCHAR(255),
    Payment_Verification varchar(255),
    verified_by VARCHAR(255),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);
CREATE TABLE plantation_details (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_id BIGINT UNSIGNED NOT NULL,
    ownership VARCHAR(255),
    well_irrigation VARCHAR(255),
    area_irrigated VARCHAR(255),
    irrigated_lands VARCHAR(255),
    patta VARCHAR(255),
    total_area VARCHAR(255),
    taluk char(255),
    firka char(255),
    revenue VARCHAR(255),
    crop_season VARCHAR(255),
    livestocks VARCHAR(255),
    sf_number CHAR(255),
    soil_type CHAR(255),
    land_to_benefit varchar(255),
    date_of_ins varchar(255),
    area_benefited_by_proposal VARCHAR(255),
    any_other_works CHAR(255),
    p_contribution CHAR(255),
    f_contribution CHAR(255),
    total_est CHAR(255),
    field_insp VARCHAR(255),
    site_app VARCHAR(255),
    date_of_app varchar(255),
	plantaions VARCHAR(255),
    nos bigint,
    price bigint,
    other_exp bigint,
    tot_nos bigint,
    tot_price bigint,
    Payment_Verification varchar(255),
    verified_by VARCHAR(255),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);
CREATE TABLE farm_pond_details (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    form_id BIGINT UNSIGNED NOT NULL,
    ownership VARCHAR(255),
    well_irrigation VARCHAR(255),
    area_irrigated VARCHAR(255),
    irrigated_lands VARCHAR(255),
    patta VARCHAR(255),
    total_area VARCHAR(255),
    taluk char(255),
    firka char(255),
    revenue VARCHAR(255),
    crop_season VARCHAR(255),
    livestocks VARCHAR(255),
    sf_number CHAR(255),
    soil_type CHAR(255),
    land_to_benefit varchar(255),
    date_of_ins varchar(255),
    length VARCHAR(255),
    breadth varchar(255),
    depth varchar(255),
    volume varchar(255),
    p_contribution CHAR(255),
    f_contribution CHAR(255),
    total_est CHAR(255),
    area_benefited char(255),
    field_insp VARCHAR(255),
    site_app VARCHAR(255),
    date_of_app varchar(255),
	len_pf varchar(255),
    bre_pf VARCHAR(255),
    dep_pf VARCHAR(255),
    vol_pf VARCHAR(255),
    area_benefited_postfunding VARCHAR(255),
    Payment_Verification varchar(255),
    verified_by VARCHAR(255),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);

CREATE TABLE migrations (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INT(11) NOT NULL
);
CREATE TABLE sessions (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT(11) NOT NULL,
    KEY sessions_user_id_index (user_id),
    KEY sessions_last_activity_index (last_activity)
);