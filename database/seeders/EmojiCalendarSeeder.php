<?php

namespace Database\Seeders;

use App\Models\Mood;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmojiCalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $arr=['😡','😞','😐','🙂','😄'];

        foreach($users as $user){
            $faker = Factory::create();
            for($i=1;$i<102;$i++){
                $start=Carbon::now()->subDays($i);
                $end=$start->addHour();
                Mood::create([
                    'user_id'=>$user->id,
                    'icon'=>$faker->randomElement($arr),
                    'description'=>$faker->sentence(),
                    'start'=>$start,
                    'end'=>$end
                ]);
            }
        }

        
    }
}
