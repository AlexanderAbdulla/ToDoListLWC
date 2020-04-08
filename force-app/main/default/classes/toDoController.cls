public with sharing class toDoController {
    
    @AuraEnabled(Cacheable=true)
    public static List<ToDo__c> getAllToDos(){
        return [SELECT id, name, Status__c, Description__c FROM  ToDo__c];
    }

}
