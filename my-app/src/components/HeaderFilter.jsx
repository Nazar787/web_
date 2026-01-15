import React from 'react';
import styles from './HeaderFilter.module.css';
import Select from './Select'; 
import Button from './Button'; 

const sexOptions = [
  { value: '', label: 'All Genders' },
  { value: 'Woman', label: 'Woman' },
  { value: 'Man', label: 'Man' }
];

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'France', label: 'France' },
  { value: 'USA', label: 'USA' }
];

const brandOptions = [
  { value: '', label: 'All Brands' },
  { value: 'DIOR', label: 'Dior' }, 
  { value: 'CHANEL', label: 'Chanel' }, 
  { value: 'CAROLINA HERRERA', label: 'Carolina Herrera' }, 
  { value: 'GIVENCHY', label: 'Givenchy' }
];


function HeaderFilter({
  selectedSex,
  setSelectedSex,
  selectedCountry,
  setSelectedCountry,
  selectedBrand,
  setSelectedBrand,
  onApply 
}) {
    const handleApplyClick = (e) => {
        e.preventDefault();
        if (onApply) onApply(); 
    };

    return(
        <form className={styles.filterSection} onSubmit={handleApplyClick}>
            
            <div className={styles.filterContent}> 
                
                <div className={styles.filterBar}>
                    <Select 
                      label="Genders" 
                      name="filter-sex" 
                      options={sexOptions}
                      value={selectedSex} 
                      onChange={(e) => setSelectedSex(e.target.value)} 
                    />

                    <Select 
                      label="Made in" 
                      name="filter-country" 
                      options={countryOptions}
                      value={selectedCountry} 
                      onChange={(e) => setSelectedCountry(e.target.value)} 
                    />

                    <Select 
                      label="Brand" 
                      name="filter-brand" 
                      options={brandOptions}
                      value={selectedBrand} 
                      onChange={(e) => setSelectedBrand(e.target.value)} 
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <Button 
                        type="submit" 
                        className={styles.applyButton} 
                    >
                        Apply Filters
                    </Button>
                </div>
            </div> 
        </form>
    )
}

export default HeaderFilter;