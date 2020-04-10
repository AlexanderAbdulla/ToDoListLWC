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

    @AuraEnabled
    public static ToDo__c updateToDoNameDescription(String toDoId, String name, String description){
        ToDo__c td = [SELECT id, name, Status__c, Description__c FROM  ToDo__c WHERE id = :toDoId LIMIT 1];
        td.Name = name;
        td.Description__c = description;
        update td;
        return td;
    }

    @AuraEnabled
    public static List<ToDo__c> createNewToDo(String name, String description){
        ToDo__c td = new ToDo__c(name = name, Description__c = description, Status__c = 'Not Started');
        insert td; 
        //return td; 
        return [SELECT id, name, Status__c, Description__c FROM  ToDo__c];
    }

    @AuraEnabled
    public static List<ToDo__c> deleteToDo(String toDoId){
        ToDo__c td = [SELECT id, name, Status__c, Description__c FROM  ToDo__c WHERE id = :toDoId LIMIT 1];
        delete td;
        return [SELECT id, name, Status__c, Description__c FROM  ToDo__c];
    }
}