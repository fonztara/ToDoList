//
//  ContentView.swift
//  PersonalProject
//
//  Created by Alfonso Tarallo on 03/11/23.
//

import SwiftUI

struct ContentView: View {
    var api = API()
    
    @State var name: String = ""
    @State var email: String = ""
    @State var password: String = ""
    
    var body: some View {
        VStack(spacing: 24) {
            TextField("Name", text: $name)
            TextField("Email", text: $email)
            TextField("Password", text: $password)
            Button(action: {
                Task {
                    do {
                        try await api.addUser(name: name, email: email, password: password)
                    } catch {
                        print("Error")
                    }
                }
            }, label: {
                Text("Signup")
            }).buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
