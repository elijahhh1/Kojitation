<?php

namespace Database\Seeders;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionChoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Choice::create(['id'=>1,'level'=>0,'choice'=>'Never']);
        Choice::create(['id'=>2,'level'=>1,'choice'=>'Almost Never']);
        Choice::create(['id'=>3,'level'=>2,'choice'=>'Sometimes']);
        Choice::create(['id'=>4,'level'=>3,'choice'=>'Fairly Often']);
        Choice::create(['id'=>5,'level'=>4,'choice'=>'Very Often']);
        /***************************** */
        Choice::create(['id'=>6,'level'=>1,'choice'=>'Almost']);
        Choice::create(['id'=>7,'level'=>2,'choice'=>'Sometimes']);
        Choice::create(['id'=>8,'level'=>3,'choice'=>'Often']);
        Choice::create(['id'=>9,'level'=>4,'choice'=>'Usually']);

        Question::create(['id'=>1,'question'=>'In the last month, how often have you been upset because of something that happened unexpectedly?']);
        Question::create(['id'=>2,'question'=>'In the last month, how often have you felt that you were unable to control the important things in your life?']);
        Question::create(['id'=>3,'question'=>'In the last month, how often have you felt nervous and stressed?']);
        Question::create(['id'=>4,'question'=>'In the last month, how often have you felt confident about your ability to handle your personal problems?']);
        Question::create(['id'=>5,'question'=>'In the last month, how often have you felt that things were going your way?']);
        Question::create(['id'=>6,'question'=>'In the last month, how often have you found that you could not cope with all the things that you had to do?']);
        Question::create(['id'=>7,'question'=>'In the last month, how often have you been able to control irritations in your life?']);
        Question::create(['id'=>8,'question'=>'In the last month, how often have you felt that you were on top of things?']);
        Question::create(['id'=>9,'question'=>'In the last month, how often have you been angered because of  things that happened that were outside of your control?']);
        Question::create(['id'=>10,'question'=>'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?']);
        /***************************** */

        Question::create(['id'=>11,'question'=>'You feel rested']);
        Question::create(['id'=>12,'question'=>"You feel that too many demands are being made on you"]);
        Question::create(['id'=>13,'question'=>'You are irritable or grouchy']);
        Question::create(['id'=>14,'question'=>'You have too many things to do']);
        Question::create(['id'=>15,'question'=>'You feel lonely or isolated']);
        Question::create(['id'=>17,'question'=>"You feel you're doing things you really like"]);
        Question::create(['id'=>16,'question'=>'You find yourself in situations of conflict']);
        Question::create(['id'=>18,'question'=>'You feel tired']);
        Question::create(['id'=>19,'question'=>'You fear you may not manage to attain your goals']);
        Question::create(['id'=>20,'question'=>'You feel calm']);
        Question::create(['id'=>21,'question'=>'You have too many decisions to make']);
        Question::create(['id'=>22,'question'=>'You feel frustrated']);
        Question::create(['id'=>23,'question'=>'You are full of energy']);
        Question::create(['id'=>24,'question'=>'You feel tense']);
        Question::create(['id'=>25,'question'=>'Your problems seem to be piling up']);
        Question::create(['id'=>26,'question'=>"You feel you're in a hurry"]);
        Question::create(['id'=>27,'question'=>'You feel safe and protected']);
        Question::create(['id'=>28,'question'=>'You have many worries']);
        Question::create(['id'=>29,'question'=>'You are under pressure from other people']);
        Question::create(['id'=>30,'question'=>'You feel discouraged']);
        Question::create(['id'=>31,'question'=>'You enjoy yourself']);
        Question::create(['id'=>32,'question'=>'You are afraid for the future']);
        Question::create(['id'=>33,'question'=>"You feel you're doing things because you have to not because you want to"]);
        Question::create(['id'=>34,'question'=>'You feel criticized or judged']);
        Question::create(['id'=>35,'question'=>'You are lighthearted']);
        Question::create(['id'=>36,'question'=>'You feel mentally exhausted']);
        Question::create(['id'=>37,'question'=>'You have trouble relaxing']);
        Question::create(['id'=>38,'question'=>'You feel loaded down with responsibility']);
        Question::create(['id'=>39,'question'=>'You have enough time for yourself']);
        Question::create(['id'=>40,'question'=>'You feel under pressure from deadlines']);
    }
}
