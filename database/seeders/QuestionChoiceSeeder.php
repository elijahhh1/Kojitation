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
        Choice::create([
            'level'=>0,
            'choice'=>'Never'
        ]);

        Choice::create([
            'level'=>1,
            'choice'=>'Almost Never'
        ]);

        Choice::create([
            'level'=>2,
            'choice'=>'Sometimes'
        ]);

        Choice::create([
            'level'=>3,
            'choice'=>'Fairly Often'
        ]);

        Choice::create([
            'level'=>4,
            'choice'=>'Very Often'
        ]);

        $questions=[
            'In the last month, how often have you been upset because of something that happened unexpectedly?',
            'In the last month, how often have you felt that you were unable to control the important things in your life?',
            'In the last month, how often have you felt nervous and stressed?',
            'In the last month, how often have you felt confident about your ability to handle your personal problems?',
            'In the last month, how often have you felt that things were going your way?',
            'In the last month, how often have you found that you could not cope with all the things that you had to do?',
            'In the last month, how often have you been able to control irritations in your life?',
            'In the last month, how often have you felt that you were on top of things?',
            'In the last month, how often have you been angered because of  things that happened that were outside of your control?',
            'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?'
        ];

        foreach($questions as $id=>$question){
            Question::create([
                'id'=>$id+1,
                'question'=>$question
            ]);
        }
    }
}
