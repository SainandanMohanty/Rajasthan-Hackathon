pragma solidity ^0.4.21;

contract HealthCoin {
    
    uint private constant newValue = 2**5;
    address private admin;
    
    //stores list of hospitals
    string[] private hospitalList;
    
    //stores list of patients
    string[] private patientList;
    
    //stores balance of all hospitals
    mapping (string => uint) private hospitalBalance;
    
    //stores balance of all patients
    mapping (string => uint) private patientBalance;
    
    //stores existing data version number of a patient
    mapping (string => uint) private existingDataVersionNumber;
    
    //custom access modifier which only allows the admin to access a function
    modifier adminAccess {
        require (admin == msg.sender);
        _;
    }
    
    //constructor sets admin address
    function HealthCoin() public {
        admin = msg.sender;
    }
    
    //accepts name of the hospital, name of the patient and version number of patient data
    //returns balance of the hospital and the patient after credit
    function creditBalance(string hospital, string patient) public {
        uint credit = newValue / 2**(existingDataVersionNumber[patient]);
        
        hospitalBalance[hospital] += credit;
        patientBalance[patient] += credit;
        
        existingDataVersionNumber[patient]++;
        
        //return (hospitalBalance[hospital], patientBalance[patient]);
    }
    
    //adds a hospital to hospitalList
    function addHospital(string newHospital) public adminAccess {
            hospitalList.push(newHospital);
            hospitalBalance[newHospital] = 0;
    }
    
    //adds a patient to patientList
    function addPatient(string newPatient) public {
        patientList.push(newPatient);
        patientBalance[newPatient] = 0;
        existingDataVersionNumber[newPatient] = 0;
    }
    
    //returns balance of a hospital
    function getHospitalBalance(string hospital) public view returns (uint) {
        return hospitalBalance[hospital];
    }
    
    //returns balance of a patient
    function getPatientBalance(string patient) public view returns (uint) {
        return patientBalance[patient];
    }
}