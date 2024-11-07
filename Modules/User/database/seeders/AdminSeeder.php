<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\User\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
            'user',
            'server',
            'log-user',
            'log-app',
            'readOnly'
        ];
            
            foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }


        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $adminRole->syncPermissions(Permission::all());

        $admin = User::firstOrCreate(
            ['auth_name' => 'ownerApp'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'password' => Hash::make('password'),
            ], 
        );
         
        $admin->assignRole($adminRole);


            // visitor
        $visitorRole = Role::firstOrCreate(['name' => 'visitor']);
        $permissions = Permission::whereIn('name', ['Reader', 'log-app'])->get();
        $visitorRole->syncPermissions($permissions);

            // expert
        $visitorRole = Role::firstOrCreate(['name' => 'expert']);
        $permissions = Permission::whereIn('name', ['server', 'log-app', 'Reader'])->get();
        $visitorRole->syncPermissions($permissions);

        
    }
}
