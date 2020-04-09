public with sharing class toDoController {
    
    @AuraEnabled(Cacheable=true)
    public static List<ToDo__c> getAllToDos(){
        return [SELECT id, name, Status__c, Description__c FROM  ToDo__c];
    }

    @AuraEnabled
    public static void updateToDoStatus(String toDoId) {
        //a0E6g00000222hxEAA
        ToDo__c td = [SELECT id, name, Status__c, Description__c FROM  ToDo__c WHERE id = :toDoId LIMIT 1];
        td.Status__c = 'Completed';
        update td;
    }

    /*
    Account a = new Account(Name='Acme2');
insert(a);

Account myAcct = [SELECT Id, Name, BillingCity FROM Account WHERE Id = :a.Id];
myAcct.BillingCity = 'San Francisco'; 

try {
    update myAcct;
} catch (DmlException e) {
    // Process exception here
}
    */


}
