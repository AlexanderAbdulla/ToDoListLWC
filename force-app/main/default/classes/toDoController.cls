public with sharing class toDoController {
    
    @AuraEnabled(Cacheable=true)
    public static List<ToDo__c> getAllToDos(){
        return [SELECT id, name, Status__c, Description__c FROM  ToDo__c];
    }

    @AuraEnabled
    public static ToDo__c updateToDoStatus(String toDoId, String toDoValue) {
        ToDo__c td = [SELECT id, name, Status__c, Description__c FROM  ToDo__c WHERE id = :toDoId LIMIT 1];
        td.Status__c = toDoValue;
        update td;
        return td;
    }
}