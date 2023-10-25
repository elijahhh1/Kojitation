<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();



        for($i=0;$i<22;$i++){
            Document::create([
                'user_id'=>User::all()->random()->id,
                'title'=>$faker->catchPhrase(), 
            ]);
        }

        for($i=0;$i<33;$i++){
            Document::create([
                'user_id'=>User::all()->random()->id,
                'document_id'=>Document::all()->random()->id,
                'title'=>$faker->catchPhrase()
            ]);
        }

        for($i=0;$i<33;$i++){
            Document::create([
                'user_id'=>User::all()->random()->id,
                'document_id'=>Document::all()->random()->id,
                'title'=>$faker->catchPhrase()
            ]);
        }

        for($i=0;$i<33;$i++){
            Document::create([
                'user_id'=>User::all()->random()->id,
                'document_id'=>Document::all()->random()->id,
                'title'=>$faker->catchPhrase()
            ]);
        }
    }
}
